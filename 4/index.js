const fs = require("fs");
const path = require("path");
const myArgs = process.argv.slice(2); // get the terminal argument
const filePath = path.join(__dirname, "" + myArgs[0]);

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    const lines = data.split("\n").length;
    console.log(`There are ${lines} lines in ${myArgs[0]}`);
  }
});
