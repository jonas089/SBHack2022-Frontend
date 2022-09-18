// Get the controller for the Casper
const controller = require("../../controllers/casper/casper.controller");

// the module exports for the app
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

//*************************************************************** */
// Prepare deploy of the transactions 
//*************************************************************** */ 
app.post(
    "/api/casper/prepareDeploy", 
    controller.prepareDeploy
    );
    
//*************************************************************** */
// Prepare deploy of the transactions 
//*************************************************************** */ 
}