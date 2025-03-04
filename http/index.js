const fs = require("fs");
const express = require("express");
const app = express();
const FILE_NAME = "todo.json";

app.use(express.json()); // essential for the using and manipulating the json data in the req and res

function ensureFileExists() {
  if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, JSON.stringify([], null, 2), "utf8");
  }
}

function loadTodos() {
  ensureFileExists();
  try {
    const data = fs.readFileSync(FILE_NAME, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return [];
  }
}

function saveTodos(todos) {
  try {
    fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
}
let todo = loadTodos();

app.get("/todos", (req, res) => {
  res.send(todo);
});
app.post("/newTodo", (req, res) => {
  const data = req.body.data;
  if (!data) {
    return res.status(400).json({ error: "Data field is required" });
  }
  todo.push({ index: todo.length + 1, data }); // No need to parse
  saveTodos(todo);
  res.send(`Added: "${data}"`);
});

app.delete("/deleteTodo", (req, res) => {
  const ind = req.body.ind;
  console.log("Received index to delete:", ind);

  if (ind === undefined) {
    return res.status(400).json({ error: "Index is required" });
  }

  const index = parseInt(ind);

  // Check if index exists
  // bool return
  const taskExists = todo.some((item) => item.index === index);
  if (!taskExists) {
    return res.status(404).json({ error: `No task found with index ${index}` });
  }

  // Remove the element
  let newTodo = todo.filter((item) => item.index !== index);

  // Re-index remaining tasks
  todo = newTodo.map((item, i) => ({ index: i + 1, data: item.data }));

  saveTodos(todo);

  res.send(`Deleted task ${index}`);
});

app.listen(3000); // port number
