const { application, Router }  = require("express");
const { getAllCountries, createCountry, getNameandId, getCountryDetails } = require("../controller/CountryController");

const route = new Router();

route.get("/country", getAllCountries)    // Extra part


route.get("/countries", getNameandId)

route.get("/country/:countryId", getCountryDetails)

route.post("/country", createCountry)



module.exports = route;