const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
const FILE_NAME = "todo.json";

function loadTodos() {
  try {
    const data = fs.readFileSync(FILE_NAME, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
function saveTodos(todos) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(todos, null, 2), "utf8");
}
let todo = loadTodos();
program
  .name("to-do")
  .description("CLI to do file based tasks")
  .version("0.8.0");

program
  .command("add")
  .description("new to do")
  .argument("<string>", "todo task")
  .action((task) => {
    todo.push({ index: todo.length + 1, data: task });
    saveTodos(todo);
    console.log(`Added: "${task}"`);
  });

program
  .command("delete")
  .description("delete to do")
  .argument("<index>", "index delete")
  .action((ind) => {
    const index = parseInt(ind);
    // remove the element
    const newTodo = todo.filter((item) => item.index !== index);
    // if still remains the size same then no deletion happen
    if (newTodo.length === todo.length) {
      console.log(`No task found with index ${index}`);
      return;
    }

    // Re-index remaining tasks
    todo = newTodo.map((item, i) => ({ index: i + 1, data: item.data }));
    saveTodos(todo);
    console.log(`Deleted task ${index}`);
  });

program
  .command("all")
  .description("all to do's")
  .action(() => {
    if (todo.length === 0) {
      console.log("No tasks found.");
      return;
    }
    todo.forEach((task) => console.log(`${task.index}. ${task.data}`));
  });

program.parse();
