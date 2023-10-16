const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"), data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};
fileOps();

/*
//Reading files
fs.readFile(
  path.join(__dirname, "files", "starter.txt"), //using join method
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);


//Writing file
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"), //using join method
  "nice to meet you", //specify the file content
  (err) => {
    if (err) throw err;
    console.log("write complete");

    //Updating a file
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"), //using join method
      "\n\nyes it is", //specify the file content
      (err) => {
        if (err) throw err;
        console.log("append complete");

        //Rename
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("rename complete");
          }
        );
      }
    );
  }
);
*/

//if we had an uncaught error EXIT
process.on("uncaughtException", (err) => {
  console.error(`there was an uncaught error ${err}`);
  process.exit(1);
});
