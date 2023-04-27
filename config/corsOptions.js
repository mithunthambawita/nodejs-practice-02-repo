const allowedOrigins = require('./allowedOrigins');
  const crosOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new error("Not allowed by CROS"));
      }
    },
    optionsSuccessStatus: 200,
  };

  module.exports = crosOptions;