const fs = require("fs");

//readable stream
const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf-8" });

//writeable stream
const ws = fs.createWriteStream("./files/new-lorem.txt");

/*
rs.on("data", (dataChunk) => {
  ws.write(dataChunk);
});
*/

rs.pipe(ws);
