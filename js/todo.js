"use strict";

// BU yerda biz html elementlarni tanlab olyapmiz
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".todos-list");

const todos = [];

elList.addEventListener("click", function (evt) {
  const deleteBtnId = evt.target.dataset.deleteBtnId * 1;
  const foundTodoIndex = todos.findIndex((todo) => todo.id === deleteBtnId);

  if (evt.target.matches(".delete-btn")) {
    todos.splice(foundTodoIndex, 1);

    elList.innerHTML = null;

    renderTodos(todos, elList);
  } else if (evt.target.matches(".checkbox-btn")) {
    const checkboxId = evt.target.dataset.checkboxBtnId * 1;

    const foundTodo = todos.find((todo) => todo.id === checkboxId);

    foundTodo.isCompleted = !foundTodo.isCompleted;

    elList.innerHTML = null;

    renderTodos(todos, elList);
  }
});

const renderTodos = function (arr, htmlElement) {
  arr.forEach((todo) => {
    const newItem = document.createElement("li");
    const newCheckbox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newItem.textContent = todo.title;
    newCheckbox.type = "checkbox";
    newDeleteBtn.textContent = "Delete";

    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("checkbox-btn");

    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckbox.dataset.checkboxBtnId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    htmlElement.appendChild(newItem);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newDeleteBtn);
  });
};

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputValue = elInput.value;

  const newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodo);

  elInput.value = null;
  elList.innerHTML = null;

  renderTodos(todos, elList);
});
