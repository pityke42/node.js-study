const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

//initialize the object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on("log", (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  //Emit the event with delay
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
