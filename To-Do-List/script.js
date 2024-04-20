const date = new Date();
const formattedDate = date.toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

//-----------------------------------------------------------------------------
//-------To-do lists logic starts here----------
//for local storage
let todoList = [];

const dateElement = document.getElementById("subheading");
dateElement.textContent = formattedDate;

//add event listener to form submit to add to to-do-list
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  //prevent default
  event.preventDefault();
  //extract data from input value
  const data = form.elements["todo"].value;
  //display li using a funcn addlist
  addList(data);
  //clear field
  form.reset();
  //get refernce to input field
  const input = document.getElementById("input-of-form");
  //focus back on input
  input.focus();
});

//-----------------------------------------------------------------------
//-----------function-to-add-todo-List-which also sets localstoarge-----------------

//func addlist(text)
function addList(text) {
  //creates an li
  const liElement = document.createElement("li");
  // create input type checkbox and label whose innerText is received as params
  const input = document.createElement("input");
  input.type = "checkbox";
  const label = document.createElement("label");
  label.textContent = text;
  // append label and input to li
  liElement.append(input, label);
  // add eventlistener to checkbox here--pass function strikethrough(event)
  //   input.addEventListener("click", function (event) {
  //     strikeThrough(event);
  //   });
  // append li to ul
  const ul = document.getElementById("list");
  ul.append(liElement);
  //local storage- each li corresponds to ane object
  const item = {};
  item["value"] = text;
  item["state"] = false;
  //add all object to array
  todoList.push(item);
  //revise the same key with updated array
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

//----------------------------------------------------------------------
//----event listener for clearr button also updates local storage-----------------------

//addevent listener to clear all button for click
const clearButton = document.getElementById("button_clear");
clearButton.addEventListener("click", () => {
  //  select Ul element using  list id
  const ul = document.getElementById("list");
  //set innerhtml as "" empty for ul
  ul.innerHTML = " ";
  todoList = [];
  //revise localstorage with revised todoList
  localStorage.setItem("todoList", JSON.stringify(todoList));
});

//----------------------------------------------------------------------
//--function for striking off functionality & updating state change in local Storage------

//function strikethrough(event)
function strikeThrough(event, index) {
  //change labelstylefontdecoration to linethrough if event.target.checked is true
  console.log(todoList);
  const label = event.target.nextElementSibling;
  if (event.target.checked) {
    todoList[index].state = true;
    label.style.textDecoration = "line-through";
  } else {
    label.style.textDecoration = "none";
    todoList[index].state = false;
  }
  //revise localstorage with revised todoList
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

//----------------------------------------------------------------------
//---eventlistener for listening checklist click of dynamic list
//which also calculates index of the checklist in todo list to help in
//changing its state in  Local Storage -------------------

//or else add eventlistener to ul click event
const ul = document.getElementById("list");
ul.addEventListener("click", function (event) {
  //if target matches('input[type="checkbox]')
  if (event.target.matches('input[type="checkbox"]')) {
    //get the index of this li amongst siblings
    //form array queryingforall-input
    const collectionOfInputs = document.querySelectorAll("#list>li>input");
    //current input reference through target
    const currentInput = event.target;
    //find index
    const index = Array.from(collectionOfInputs).indexOf(currentInput);
    console.log(index);
    //call function strikethrough(event)
    strikeThrough(event, index);
  }
});

//-------------------------------------------------------------------------
//----eventListener to listen to pageReload and
//populate data again using local storage

//add event listener
document.addEventListener("DOMContentLoaded", () => {
  //fetch data from local storage which is an array
  todoList = JSON.parse(localStorage.getItem("todoList"));
  //forEach element populate list require new function because
  //addList will also have state and according to state it will
  //be strikedoff or not
  if (todoList) {
    todoList.forEach((object) => {
      //store value and state
      const value = object.value;
      const state = object.state;
      //call function
      populateTodoList(value, state);
    });
  }
});

//-------------------------------------------------------------------------------
//function to populate data

//function accepts two things
function populateTodoList(value, state) {
  //populate as above using value
  //creates an li
  const liElement = document.createElement("li");
  // create input type checkbox and label whose innerText is received as params
  const input = document.createElement("input");
  input.type = "checkbox";
  const label = document.createElement("label");
  label.textContent = value;
  // append label and input to li
  liElement.append(input, label);
  // append li to ul
  const ul = document.getElementById("list");
  ul.append(liElement);

  //according to state set checklist as checked or unchecked and style also
  if (state) {
    input.checked = true;
    label.style.textDecoration = "line-through";
  }
}
