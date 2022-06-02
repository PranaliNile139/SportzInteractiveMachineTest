let countries = require("../../data/data.json");
const idGen = require("../utils/generateId");
const fs = require("fs");

// ****************************************************************** Validation ***************************************************** //
const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidName = function (value) {
  if (!/^([a-zA-Z ]){3,20}$/.test(value.trim())) {
    return false;
  }
  return true;
};

// ************************************** Getting all the countries Details with all the data ****************************************//
exports.getAllCountries = (req, res) => {
  //Validate body
  const body = req.body;
  if (isValidRequestBody(body)) {
    return res
      .status(400)
      .send({ status: false, message: "Body must not be present" });
  }

  // No data must be passed through query
  const query = req.query;
  if (isValidRequestBody(query)) {
    return res
      .status(400)
      .send({ status: false, message: "Invalid parameters" });
  }

  return res.status(200).send(countries);
};

// ************************************************************ get API /countries ******************************************************* //

// Getting only name and Id from the countries Detail
exports.getNameandId = (req, res) => {
  try {
    //Validate body
    const body = req.body;
    if (isValidRequestBody(body)) {
      return res
        .status(400)
        .send({ status: false, message: "Body must not be present" });
    }

    // No data must be passed through query
    const query = req.query;
    if (isValidRequestBody(query)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid parameters" });
    }

    const allCountries = [];
    countries.countries.forEach((el) => {
      country = {};
      country.id = el.id;
      country.name = el.name;
      allCountries.push(country);
    });
    return res.status(200).send(allCountries);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// ****************************************************** get API /country/:countryId ************************************************** //

// get country details with countryId
exports.getCountryDetails = (req, res) => {
  try {
    //Validate body
    const body = req.body;
    if (isValidRequestBody(body)) {
      return res
        .status(400)
        .send({ status: false, message: "Body must not be present" });
    }

    // No data must be passed through query
    const query = req.query;
    if (isValidRequestBody(query)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid parameters" });
    }

    const { countryId } = req.params;
    const country = countries.countries.find((el) => el.id === countryId);

    // if countryId is not present in data so error message will be shown
    if (!country) {
      return res
        .status(400)
        .send({
          status: false,
          message: "No country found with this countryId",
        });
    }
    return res.status(200).send(country);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// ******************************************************************* post API /country ************************************************//

exports.createCountry = async (req, res) => {
  try {
    const { body } = req;
    //Validate body
    if (!isValidRequestBody(body)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Country details must be present in body",
        });
    }

    const { name, continent, flag, rank } = body;

    // Validation of country name
    if(!isValid(name)) {
      return res.status(400).send("Country name is required");
    }

    // Validate continent
    if(!isValid(continent)) {
      return res.status(400).send("Continent is required");
    }

    // Validate flag
    if(!isValid(flag)) {
      return res.status(400).send("Countries Flag is required");
    }

    // Validate rank
    if(!isValid(rank)) {
      return res.status(400).send("Countries rank is required");
    }

    // Validation of name (i.e. character must be between character 3 and 20)
    if (!isValidName(name)) {
      return res
        .status(400)
        .send("Country name must be between 3 to 20 characters");
    }

    // Since countryId is not given so here we will generate Id, which we have done in utils folder
    const newCountry = Object.assign({ id: idGen() }, body);
    // console.log(newCountry)

    // Now the Id which will be generated will be pushed in data when you will createCountry
    countries.countries.push(newCountry);


    // Here we are checking if any duplicate name and rank are present or not
    fs.readFile(`${__dirname}/../../data/data.json`, (err, data) => {
      if (err) {
        return err;
      }
      let store = JSON.parse(data.toString());
      for(let i=0; i<store.countries.length; i++) {
        if(store.countries[i].name == name || store.countries[i].rank == rank) {
          return res.status(400).send ({msg:"name and rank should be unique"})
        }
      }

      // if no duplicate data is present so it will writeFile the data which is to be created
      fs.writeFile(
        `${__dirname}/../../data/data.json`,
        JSON.stringify(countries),
        (err) => {
          if (err) throw err;
  
  
          //Finally country details has been stored in data file
          return res.status(201).send({
            status: "Success",
            results: countries.length,
            data: { country: newCountry },
          });
        }
      );
    });

  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//////////////////////////////////////////////////////////////////////// END ///////////////////////////////////////////////////////////////
