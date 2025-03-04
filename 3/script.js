// let currentIdex = 1;
// function addTodo() {
//   const data = document.getElementById("input_box");
//   console.log(data.value);

//   const textNode = document.createElement("div");
//   textNode.id = "todo-" + currentIdex;
//   textNode.setAttribute("style", "display : flex");

//   const h4Node = document.createElement("h4");
//   const text = currentIdex + ". " + data.value;
//   h4Node.innerHTML = text;

//   const buttonNode = document.createElement("button");
//   buttonNode.innerHTML = "Delete";
//   buttonNode.setAttribute("onclick", "deleteTodo(" + currentIdex + ")");

//   textNode.appendChild(h4Node);
//   textNode.appendChild(buttonNode);

//   const parentElement = document.getElementById("todos");
//   parentElement.appendChild(textNode);

//   currentIdex++;
//   data.value = "";
//   render();
// }
// function render(todos) {
//     const todoList = document.getElementById('root');
//     todoList.innerHTML = ''; // Clear the list

//     todos.forEach(todo => {
//       const div = document.createElement('div');
//       const h1 = document.createElement('h4');
//       h1.textContent = todo.title;
//       div.appendChild(h1);
//       div.setAttribute('data-id', todo.id);
//       todoList.appendChild(div);
//     });
//   }
//   render([{
//     id: 1,
//     title: "Go to gym"
//   }, {
//     id: 2,
//     title: "Clean the car"
//   }])
// function deleteTodo(index) {
//   const element = document.getElementById("todo-" + index);
//   element.parentNode.removeChild(element);
// }
let ctr = 2;
let todos = [
  {
    id: 1,
    title: "Go to gym",
  },
  {
    id: 2,
    title: "Clean the car",
  },
];

function addTodo() {
  todos.push({
    id: ctr,
    title: document.querySelector("input").value,
  });
  render(todos);
}

function render(todos) {
  const todoList = document.getElementById("root");
  todoList.innerHTML = ""; // Clear the list

  todos.forEach((todo) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h4");
    h1.textContent = todo.title;
    div.appendChild(h1);
    div.setAttribute("data-id", todo.id);
    todoList.appendChild(div);
  });
}
render(todos);
