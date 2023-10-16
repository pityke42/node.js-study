const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { error } = require("console");
const PORT = process.env.PORT || 3500;

//Creating custom middleware//Implemented in logEvents
app.use(logger);

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
app.use(cors(corsOptions));

//Built in middleware
//app.use() above the routes this will apply to all routes that come in
//handling url encoded data-form data
app.use(express.urlencoded({ extended: false }));

//Built in middleware for json
app.use(express.json());

//Serve static files
app.use(express.static(path.join(__dirname, "/public")));

//Define first route/using regex
app.get("^/$|/index(.html)?", (req, res) => {
  //1.
  //   res.sendFile("./views/index.html", { root: __dirname });
  //2.
  res.sendFile(path.join(__dirname, "views", "index.html"));
  res.sendFile("./views/index.html", { root: __dirname });
});

//New-Page
app.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page", (req, res) => {
  res.redirect(301, "/new-page.html"); //send 302 by default
});

//Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("hello world");
  }
);

// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};
//Using chaining in the route
app.get("/chain(.html)?", [one, two, three]);

//App.use('/')
//Apply all http methods at once
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      error: "404 Not Found",
    });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
