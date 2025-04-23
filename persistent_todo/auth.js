const jwt = require("jsonwebtoken");
const JWT_SECRET = "abcdefg@1234567";

const auth = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Unautherized",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unautherized",
    });
  }
};

module.exports = {
  auth,
  JWT_SECRET,
};
