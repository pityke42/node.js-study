//CORS/Cross Origin Resource Sharing
//Does need to get applied
//for public open api is ok
//WhiteList access to backend and cors will not prevent
const whiteList = [
  "https://www.yourDomainFRONTEDDOMAIN.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

//Creating cors options
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED BY THE CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
