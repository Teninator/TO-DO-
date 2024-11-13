let input = document.querySelector(".add-task-input");
let addTask = document.querySelector(".add-task-button");
let todoList = document.querySelector(".todo-list");
var root = document.querySelector(":root");
root.style.setProperty("--bg-color", localStorage.getItem("LDMode"));

let todoCounter = 0;

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask.click();
  }
});

function postJsonData() {
  /*
  sends a POST request to the server with the HTML corresponding to the list of tasks.
  The server sends back a JSON with the tasks, their categories, and de dates
   */
  const url = "http://localhost:8080/Todo_List-1.0-SNAPSHOT/api/resource/json";
  const payload = document.getElementById("todo-list").innerHTML;
  console.log(payload);

  const request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "text/html"); // setting the sending content-type
  request.setRequestHeader("Accept", "application/json");

  request.onload = () => {
    if (request.status !== 200) {
      console.error("Something went wrong went contacting the server");
      return;
    }
    console.log("Received from the server: ", request.responseText); // this contains the received payload

    let element = document.createElement("a");
    element.setAttribute(
        "href",
        `data:application/json;charset=utf-8,` +
        encodeURIComponent(request.responseText)
    );
    element.setAttribute("download", `tasks.json`);
    element.click();
  };

  // sending the payload to the server
  request.send(payload);
}

function changeLDMode() {
  /*
  This function changes between light and dark mode by changing the css
  --bg-color variable that represents the page background colour
  It also changes the sun and moon icons, to represent each of the modes
   */
  let rstyle = getComputedStyle(root);
  let sunIcon = document.getElementById("sun-icon");
  let moonIcon = document.getElementById("moon-icon");

  if (localStorage.getItem("LDMode") === "lightblue") {
    root.style.setProperty("--bg-color", "#000033");
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline"; // Display moon icon
  } else {
    root.style.setProperty("--bg-color", "lightblue");
    sunIcon.style.display = "inline"; // Display sun icon
    moonIcon.style.display = "none";
  }
  localStorage.setItem("LDMode", rstyle.getPropertyValue("--bg-color"));
}

// Call changeLDMode() when the page loads to ensure the correct icon is displayed based on the current mode
changeLDMode();

function makeDropdown() {

  // This makes code easier to understand
  let priority = document.createElement("select");
  priority.setAttribute("class", "priority-dropdown");

  let priLow = document.createElement("option");
  priLow.setAttribute("value", "low");
  priLow.innerText = "Low";
  let priMed = document.createElement("option");
  priMed.setAttribute("value", "medium");
  priMed.innerText = "Medium";
  let priHigh = document.createElement("option");
  priHigh.setAttribute("value", "High");
  priHigh.innerText = "High";

  priority.appendChild(priLow);
  priority.appendChild(priMed);
  priority.appendChild(priHigh);

  return priority;
}

// Get all todo items
const todoItems = document.querySelectorAll(".todo-item");

// Add event listener to each todo item
todoItems.forEach((item) => {
  const checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", function () {
    // Check if checkbox is checked
    if (this.checked) {
      item.classList.add("completed");
      // Add flower image on top of the hill image
      item.parentElement.parentElement.classList.add("completed");
    } else {
      item.classList.remove("completed");
      // Remove flower image on top of the hill image
      item.parentElement.parentElement.classList.remove("completed");
    }
  });
});


function addFlowerToBackground()
{
  const todoContainer = document.querySelector(".todo-container");
  // Add the flower image on top of the hill image
  todoContainer.style.backgroundImage = "url('flower.png'), url('hill.png')";
}

function removeFlowerFromBackground()
{
  const todoContainer = document.querySelector(".todo-container");
  // Revert to only the hill image
  todoContainer.style.backgroundImage = "url('hill.png')";
}


addTask.addEventListener("click", () => {
  /*
  Creates the priority dropdown, category, task, and date based on
  data from the HTML page.
  These are appended to their respective components, then all of it
  is appended to the to-do list
 */
  let taskName = input.value;

  let dueDate = document.querySelector(".add-due-date-input");

  let category = document.querySelector(".category-dropdown")

  if (taskName.trim() !== "") {
    let item = document.createElement("li");
    item.setAttribute("class", "todo-item");

    let todoID = "todo" + todoCounter.toString();

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", todoID);

    let label = document.createElement("label");
    label.setAttribute("for", todoID);
    label.innerText = taskName;

    let dueDateSpan = document.createElement("span");

    let taskCategory = document.createElement("p")
    taskCategory.innerText = category.value

    dueDateSpan.innerText = "Due: " + dueDate.value;
    console.log(dueDate);
    // Calculate time difference

    // one day: 86400000. (js timestamp)
    let currentDate = new Date();
    console.log(currentDate.getTime());

    // Apply color based on time difference
    let daysDiff = dueDate.valueAsNumber - currentDate.getTime();
    if (daysDiff < 86400000) {
      dueDateSpan.style.color = "red"; // Within a day
    } else if (daysDiff <= 86400000 * 7) {
      dueDateSpan.style.color = "#6e670b"; // Within a week
    } else {
      dueDateSpan.style.color = "green"; // Any other time
    }

    todoCounter++;

    // Appending
    item.appendChild(makeDropdown());
    item.appendChild(checkBox);
    item.appendChild(label);
    item.appendChild(taskCategory);
    item.appendChild(dueDateSpan);

    todoList.append(item);
    input.value = "";
    input.focus();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const categoryList = document.getElementById("category-list");
  const addCategoryInput = document.querySelector(".add-category-input");
  const addCategoryButton = document.querySelector(".add-category-button");

  addCategoryInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addCategoryButton.click();
    }
  });

  addCategoryButton.addEventListener("click", function () {
    const categoryName = addCategoryInput.value.trim();
    if (categoryName) {
      const categoryItem = document.createElement("li");
      categoryItem.textContent = categoryName;
      categoryList.appendChild(categoryItem);
      addCategoryInput.value = "";
      updateCategoryDropdown();
    }
  });

  function updateCategoryDropdown() {
    const categoryDropdown = document.querySelector(".category-dropdown");
    const categories = document.querySelectorAll(".category-list li");
    categoryDropdown.innerHTML = "";
    categories.forEach(function (category) {
      const option = document.createElement("option");
      option.value = category.textContent;
      option.textContent = category.textContent;
      categoryDropdown.appendChild(option);
    });
  }

  function goBack() {
    window.history.back();
  }
});