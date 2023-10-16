const allowedOrigins = require("./allowedOrigins");

//CORS/Cross Origin Resource Sharing
//Does need to get applied
//for public open api is ok
//WhiteList access to backend and cors will not prevent

//Creating cors options
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED BY THE CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
