const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

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

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
