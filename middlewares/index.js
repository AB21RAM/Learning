const express = require("express");
const app = express();

function middlewareFn(req, res, next) {
  const methodType = req.method;
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const timeStamp = Date.now();
  res.json({
    method: methodType,
    url: url,
    timeStamp: timeStamp,
  });
  next();
}
app.use(middlewareFn);
app.get("/use", (req, res) => {
  console.log("Use is called");
});

app.listen(3000);
