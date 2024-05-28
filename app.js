
const contaForm = document.querySelector(".contaForm");

const todoForm = document.querySelector(".todoForm");

const input = document.querySelector(".todoInput");

const btn = document.querySelector(".todoBtn");

const ul = document.querySelector(".todoUl");

const list = document.querySelector(".list");



let localData = JSON.parse(localStorage.getItem("localData"));

let todoArr = localData ? localData : [];
console.log(todoArr);

if(localData){
   localData.map(item=>addTodo(item));
}


let randomId = Math.floor(Math.random() * 1000);

contaForm.addEventListener("submit", (e) => {
  e.preventDefault(e);
randomId++;
  tododata = {
    id: randomId,
    todoValue: input.value,
    isComplite: false,
  };
  todoArr.push(tododata)
  addTodo(tododata);
  input.value = "";
  localStorage.setItem('localData',JSON.stringify(todoArr));
});

function addTodo(todoItem) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const editTodo = document.createElement("i");
  const deleteTodo = document.createElement("i");
  const checkTodo = document.createElement("i");
  div.className = "iconBox";
  checkTodo.className = "fa-solid fa-check";
  editTodo.className = "fa-solid fa-pen";
  deleteTodo.className = "fa-solid fa-trash";
  deleteTodo.id=todoItem.id;
  checkTodo.id=todoItem.id;
  editTodo.id=todoItem.id;
  span.innerText = todoItem.todoValue;
  div.append(deleteTodo, editTodo, checkTodo);
  li.append(span, div);
  ul.appendChild(li);
}

ul.addEventListener("click", (e) => {
  e.preventDefault();
  let li = e.target.parentNode.parentNode;

  if (e.target.className == "fa-solid fa-trash") {

    let id = e.target.getAttribute("id");

    li.remove()

    todoArr = todoArr.filter((item) => item.id != id);
   console.log(todoArr);

localStorage.setItem("localData", JSON.stringify(todoArr));
  
  }


  if (e.target.className == "fa-solid fa-pen") {
    let id = e.target.getAttribute("id");
    const newInput = document.createElement("input");
    
    if (li.children.length < 3) {
      
      li.append(newInput);
    newInput.addEventListener('change',(e)=>{
      e.preventDefault();
      li.firstChild.innerText = newInput.value;
      li.lastChild.remove();
     
   
    })
    } else {
      li.lastChild.remove();
    }
   
   
  }

  if(e.target.className == "fa-solid fa-check"){
    let id = e.target.getAttribute("id");
    if(li.firstChild.style.textDecoration !== "line-through"){
      li.firstChild.style.textDecoration = "line-through"
      li.firstChild.style.color = "red"
    }else{
      li.firstChild.style.textDecoration = "";
      li.firstChild.style.color = ""
    }
  }
});