const fs = require("fs");

/*
//creating new directory
fs.mkdir("./new", (err) => {
  if (err) throw err;
  console.log("directory created");
});
*/

//Create 'new' directory if it is not exist
if (!fs.existsSync("./new")) {
  //creating new directory
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("directory created");
  });
}

//Delete 'new' directory if it is exist
if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("directory deleted");
  });
}
