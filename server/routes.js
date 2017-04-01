/**
 * Main application routes
 */

'use strict';

var path = require('path');
var config = require('./config/environment');
var admin = require("firebase-admin");

//initlize firebase
var serviceAccount = require(config.firebase.serviceAccount);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebase.databaseURL
});




module.exports = function(app) {

  // Insert routes below
  app.use('/api/getThumb', require('./api/getThumb'));


};
