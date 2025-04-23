const express = require("express");

const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const { z } = require("zod");

mongoose.connect(
  "mongodb+srv://linuxatharvbhosale:satara2359@cluster0.8og9z.mongodb.net/todo-app"
);

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  // input validation

  // schema for the zod -> input
  const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(30),
  });

  //   const parsedData = requireBody.parse(req.body);
  const parsedDataWithSuccess = requireBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Incorrect Input",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const { email, password, name } = req.body;

  // return the promise -> therefore awaiting for task to be complete
  try {
    // hash password with number of iteration
    // salt is itself decided by the bcrypt only
    const hasedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name: name,
      password: hasedPassword,
      email: email,
    });
  } catch (e) {
    console.log(e.message);
    res.status(403).json({
      message: "email Already Taken ",
    });
    return;
  }

  res.json({
    message: "You are logged in",
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // returns a promise
  const user = await UserModel.findOne({
    email: email,
  });
  // used for the comparision with the password along with the salt present into hashed password itself
  const passwordMatch = bcrypt.compare(password, user.password);
  if (user && passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.header("token", token);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credential",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const { title, done } = req.body;
  console.log(req.userId);
  try {
    await TodoModel.create({
      userId: req.userId,
      title: title,
      done: false,
    });
    res.status(200).json({
      message: "todo Added",
    });
  } catch (e) {
    console.log(e.message);
    res.status(403).json({
      message: "Some Error",
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const data = await TodoModel.find({ userId: userId });
    if (data) {
      res.status(200).json(data);
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/done", auth, async (req, res) => {
  const { title, done } = req.body;
  const userId = req.userId;
  try {
    await TodoModel.updateOne(
      {
        userId: userId,
        title: title,
      },
      { $set: { done: true } }
    );
  } catch (e) {
    console.log(e.message);
  }
  res.status(200).json({
    message: "Mark Completed",
  });
});

app.listen(3000);
