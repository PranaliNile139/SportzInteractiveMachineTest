const express = require("express")
const dotenv = require("dotenv")
const countryRoute = require("./routes/country.route.js")

const app = express();
dotenv.config();

app.use(express.json());

app.use(express.static("public"));


app.use("/",countryRoute);

const PORT= process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening PORT ${PORT}`))