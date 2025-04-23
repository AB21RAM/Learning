const express = require("express");
// required input
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
// auth middleware
const auth = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.decode;
    // jwt.veify for the verification token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Unautherized",
        });
      } else {
        // decoded body from the payload
        // and storing it into the req.user variable
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unautherized",
    });
  }
};
// app.use(auth);

const users = [];
// JWT_SECRET for the making of the token
const JWT_SECRET = "USER_APP";
// function generateToken() {
//   let options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];

//   let token = "";
//   for (let i = 0; i < 32; i++) {
//     // use a simple function here
//     token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }

app.post("/sign-up", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // alternate Syntax : const { username, password } = req.body;

  users.push({ username, password });
  res.json({
    message: "Sign up Successfully",
  });
});

app.post("/sign-in", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });
  if (user) {
    // jwt.sign(payload, secret_key||private_key)
    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET
    );
    // adding to the current user object
    user.token = token;
    // res.header("Token", token);
    res.send({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid Credentials",
    });
  }
});

// injecting the auth middlerware
app.get("/me2", auth, (req, res) => {
  const user = req.user;
  res.send({
    username: user.username,
  });
});

app.get("/me", (req, res) => {
  const token = req.headers.token;

  const userDetails = jwt.verify(token, JWT_SECRET);
  const username = userDetails.username;

  // array.find(function return the bool and takes the single entity as parameter)
  const user = users.find((user) => {
    return user.username === username;
  });
  if (user) {
    res.json({
      username: user.username,
      //   password: user.password,
    });
  } else {
    res.status(401).send({
      message: "Inavlid Token",
    });
  }
});

app.listen(3000);
