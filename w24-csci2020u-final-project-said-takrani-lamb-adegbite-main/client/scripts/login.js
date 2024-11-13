const form = document.querySelector("#login-form");

let uname = document.getElementById("username")
let pword = document.getElementById("password")
let submitBtn = document.querySelector("#submit")
const errorBox = document.querySelector("#errorBox")
uname.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

pword.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

function postAuthLogin() {

  let unameval = document.getElementById("username").value
  let pwordval = document.getElementById("password").value

  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:8080/Todo_List-1.0-SNAPSHOT/api/resource/loginAuth");
  request.setRequestHeader("Content-Type", "text/plain");
  const payload =  unameval + "," + pwordval;
  console.log(payload)
  request.onload = () => {
    if (request.readyState == 4 && request.status == 200) {
      if(request.responseText == "true"){
        uname.value = "";
        pword.value = "";
        submitBtn.focus();
        errorBox.style.color = "darkgreen"
        console.log("redirecting..")
        errorBox.innerHTML = "redirecting...";
        window.location.href = 'index.html';
      }
      else{
        console.log("Incorrect username or password")
        uname.value = "";
        pword.value = "";
        uname.focus();
        errorBox.style.color = "darkred"
        errorBox.innerHTML = "";
        errorBox.innerHTML = "Incorrect username or password";
      }
    } else {
      console.log(`Error: ${request.status}`);
    }
  };
  request.send(payload);

}
