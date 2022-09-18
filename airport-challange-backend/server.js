// the express include
const express = require('express')
// dotenv so the parameters can be read from the environmental file
const dotenv = require('dotenv')
dotenv.config({ path: "./.env" })
// body parser to make the parsing easier
const bodyParser = require("body-parser");
// make cors available between the deployments in the local environment
const cors = require("cors");
// the express app
const app = express()


//******************************************************************************* */
// set up from which adress the cross origin should take place
//******************************************************************************* */
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// the port from the environmental variables
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//**************************************************************************** */
// routes from the routes includes
//**************************************************************************** */
require('./src/routes/casper/casper.routes')(app);

//**************************************************************************** */
// Launch the App on the desired port
//**************************************************************************** */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})