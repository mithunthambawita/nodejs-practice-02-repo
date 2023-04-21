const whiteList = [
    "https://www.yoursite.com",
    "http://127.0.0.1:5500",
    "http://localhost:3500",
  ];
  const crosOptions = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new error("Not allowed by CROS"));
      }
    },
    optionsSuccessStatus: 200,
  };

  module.exports = crosOptions;