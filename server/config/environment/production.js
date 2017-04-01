'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // Firebase connection options
  firebase: {
      databaseURL: "https://dride-2384f.firebaseio.com",
      erviceAccount: __dirname + "/dride-2384f-firebase-adminsdk-m1piu-73dbeedc24.json"
  }
};