let modalBtn = document.querySelector(".addacc");
let modalBg = document.querySelector(".addModal");
let modalClose = document.querySelector(".btn-cancel");
let modalAdd = document.querySelector(".btn-add");
let accTable = document.querySelector(".acc-table");
let editModal = document.querySelector(".editModal");
let editBtn = document.querySelector(".btn-edit");
let editCancel = document.querySelector(".btn-edit-cancel");
var editIndex;
var isLocal = true;
var bearert;
// show Accounts
checkLocal();
(async()=>{
  if(!isLocal){
    const resp = await fetch('http://localhost:8080/api/v1/account', {
    headers: { 
      "Content-Type": "application/json; charset=utf-8",
      'Authorization': bearert
    },
    method: 'GET'
  })
   const res = await resp.json()
  const fu = data => {
    if(data.accounts){
      localStorage.setItem("accounts",JSON.stringify(data.accounts))
    }else if(data.data){
      if(data.data.message == "Access Token is expired, get a new Token"){
        localStorage.setItem("bearer",null)
      window.location.href = "/login.html"
    }else if(data.data.message == "Error while parsing the Access Token!"){
      localStorage.setItem("bearer",null)
      window.location.href = "/login.html"
    }
  }else if(!data){
      alert("Server Error.")
    }
  }
  fu(res)
showAccounts();
  }else{
showAccounts();
    return
  }
})()
function checkLocal(){
  localStorage.setItem("accounts","{}")
  if(localStorage.getItem("bearer")== "null"){
    isLocal = true
    window.location.href = "/login.html"
  }else if (localStorage.getItem("bearer")=="false"){
    isLocal = true
  }else if (localStorage.getItem("bearer") != null && localStorage.getItem("bearer")!="false"){
    bearert = localStorage.getItem("bearer")
    isLocal = false
  }
}
function showAccounts() {
  let acc = localStorage.getItem("accounts");
  if (acc == "{}") {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }
  let html = "";
  accObj.forEach(function (element, index) {
    html += `
    <tr id = "acc${index}" class="acc-body">
      <td class="acc-name">${element.accName}</td>
      <td class="acc-username">${element.userName}</td>
      <td class="acc-email">${element.email}
      </td>
      <td class="acc-password">
      ${"*".repeat(element.password.length)}
      </td>
      <td class="acc-icon">
      <div class="tooltip">
      <span class="tooltiptext" id="myTooltip${index}">Copy to clipboard</span>
      <img class="copy-acc" id = "copy${index}" onClick="copyAcc(${index})" onmouseout="outFunc(${index})" src="static/svgs/copy.svg" alt="Copy"/>
      </div>
      <img class="edit-acc" id = "edit${index}" onClick="editAccount(${index})" src="static/svgs/edit.svg" alt="Edit"/>
      <img class="delete-acc" id = "delete${index}" onClick="deleteAcc(${index})" src="static/svgs/delete.svg" alt="Delete"/>
      </td>
    <tr>
    `;
  });

  accTable.innerHTML = html;

  // update total accounts
  let totalAccount = document.querySelectorAll(".acc-body").length;
  let countDiv = document.querySelector(".table-foot > span");
  countDiv.innerText = totalAccount;
}

// delete note
function deleteAcc(index) {
  let acc = localStorage.getItem("accounts");
  if (acc == "{}") {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }
  if(!isLocal){
  fetch('http://localhost:8080/api/v1/account', {
    headers: { 
      "Content-Type": "application/json; charset=utf-8",
      'Authorization': bearert
    },
    method: 'DELETE',
    body: JSON.stringify(accObj[index])
  }).then(res => res.json())
  .then(data => {
    if(data.accounts){
      localStorage.setItem("accounts",JSON.stringify(data.accounts))
    }else if(data.data.message == "Access Token is expired, get a new Token"){
      window.location.href = "/login.html"
    }else if(data.data.message == "Error while parsing the Access Token!"){
      localStorage.setItem("bearer",null)
      window.location.href = "/login.html"
    }
    else{
      alert("Server Error.")
    }
  })
}
  accObj.splice(index, 1);
  localStorage.setItem("accounts", JSON.stringify(accObj));
  showAccounts(accObj);
}

// copy to clipboard

function copyAcc(index) {
  let acc = localStorage.getItem("accounts");
  if (acc == "{}") {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }

  const el = document.createElement("textarea");
  el.value = accObj[index].password;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  let tooltipId = "myTooltip" + index;
  let tooltip = document.getElementById(tooltipId);
  tooltip.innerHTML = "Copied..!";
}

function outFunc(index) {
  let tooltipId = "myTooltip" + index;
  let tooltip = document.getElementById(tooltipId);
  tooltip.innerHTML = "Copy to clipboard";
}

// Edit Account
function editAccount(index) {
  let acc = localStorage.getItem("accounts");
  if (acc == "{}") {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }
  let editAcc = document.querySelector(".edit-account");
  let editEmail = document.querySelector(".edit-email");
  let editUsername = document.querySelector(".edit-username");
  let editPassword = document.querySelector(".edit-password");
  editAcc.value = accObj[index].accName;
  editEmail.value = accObj[index].email;
  editUsername.value = accObj[index].userName;
  editPassword.value = accObj[index].password;
  editModal.classList.add("bg-active");
  editIndex = index
}
//edit account
editBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let editAcc = document.querySelector(".edit-account");
  let editEmail = document.querySelector(".edit-email");
  let editUsername = document.querySelector(".edit-username");
  let editPassword = document.querySelector(".edit-password");
  accObj[editIndex].accName = editAcc.value;
  accObj[editIndex].email = editEmail.value;
  accObj[editIndex].userName = editUsername.value;
  accObj[editIndex].password = editPassword.value;
  localStorage.setItem("accounts", JSON.stringify(accObj));
  editModal.classList.remove("bg-active");
  if(!isLocal){
    fetch('http://localhost:8080/api/v1/account', {
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        'Authorization': bearert
      },
      method: 'PUT',
      body: JSON.stringify(accObj[editIndex])
    }).then(res => res.json())
    .then(data => {
      if(data.accounts){
        localStorage.setItem("accounts",JSON.stringify(data.accounts))
      }else if(data.data.message == "Access Token is expired, get a new Token"){
        window.location.href = "/login.html"
      }else if(data.data.message == "Error while parsing the Access Token!"){
        localStorage.setItem("bearer",null)
        window.location.href = "/login.html"
      }
      else{
        alert("Server Error.")
      }
    })
  }
  editAcc.value = "";
  editEmail.value = "";
  editUsername.value = "";
  editPassword.value = "";
  showAccounts();
});

//cancel edit
editCancel.addEventListener("click", function (e) {
  e.preventDefault();
  let editAcc = document.querySelector(".edit-account");
  let editEmail = document.querySelector(".edit-email");
  let editUsername = document.querySelector(".edit-username");
  let editPassword = document.querySelector(".edit-password");
  editAcc.value = "";
  editEmail.value = "";
  editUsername.value = "";
  editPassword.value = "";

  editModal.classList.remove("bg-active");
});


// open modal
modalBtn.addEventListener("click", function () {
  modalBg.classList.add("bg-active");
});

// close modal
modalClose.addEventListener("click", function (e) {
  e.preventDefault();
  let newAcc = document.querySelector(".new-account");
  let newEmail = document.querySelector(".new-email");
  let newUsername = document.querySelector(".new-username");
  let newPassword = document.querySelector(".new-password");

  newAcc.value = "";
  newEmail.value = "";
  newUsername.value = "";
  newPassword.value = "";

  modalBg.classList.remove("bg-active");
});

// add account
modalAdd.addEventListener("click", function (e) {
  let newAcc = document.querySelector(".new-account");
  let newEmail = document.querySelector(".new-email");
  let newUsername = document.querySelector(".new-username");
  let newPassword = document.querySelector(".new-password");

  let acc = localStorage.getItem("accounts");
  if (acc == "{}") {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }
  let myObj = {
    accName: newAcc.value,
    email: newEmail.value,
    userName: newUsername.value,
    password: newPassword.value,
  };
  newAcc.value = "";
  newEmail.value = "";
  newUsername.value = "";
  newPassword.value = "";
  modalBg.classList.remove("bg-active");
  let up = false
  if(!isLocal){
    fetch('http://localhost:8080/api/v1/account', {
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        'Authorization': bearert
      },
      method: 'POST',
      body:JSON.stringify(myObj)
    }).then(res => res.json())
    .then(data => {
      console.log(data)
          if (data.data){
            if(data.data.message == "Access Token is expired, get a new Token"){
            localStorage.setItem("bearer",null)
            window.location.href = "/login.html"
          }else if(data.data.message == "Error while parsing the Access Token!"){
            localStorage.setItem("bearer",null)
            window.location.href = "/login.html"
          }else{
            alert("Server Error.")
          } 
        }else if(data.accounts){
          localStorage.setItem("accounts",JSON.stringify(data.accounts))
          up = true
        }
    })
  }
  if(up){
    showAccounts();
    e.preventDefault();
  }else{
  accObj.push(myObj);
  localStorage.setItem("accounts", JSON.stringify(accObj));
  showAccounts();
  e.preventDefault();
  }
});

// search

let searchText = document.getElementById("searchText");
searchText.addEventListener("input", function () {
  let inputVal = searchText.value;
  let accRows = document.getElementsByClassName("acc-body");
  Array.from(accRows).forEach(function (element) {
    let accName = element.getElementsByClassName("acc-name")[0].innerText;
    let accUsername = element.getElementsByClassName("acc-username")[0]
      .innerText;
    let accEmail = element.getElementsByClassName("acc-email")[0].innerText;
    if (
      accName.includes(inputVal) ||
      accUsername.includes(inputVal) ||
      accEmail.includes(inputVal)
    ) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});
let logout = document.getElementById("logoutbtn")
logout.addEventListener("click",(e)=>{
  localStorage.setItem("bearer",null)
  localStorage.setItem("accounts","{}")
  window.location.href = "/login.html"
})


function togglePassA() {
  let elem = document.getElementById("tpsad1");
  if (elem.type === "password") {
    elem.type = "text";
  } else {
    elem.type = "password";
  }
}
function togglePassE() {
  let elem = document.getElementById("tpsad2");
  if (elem.type === "password") {
    elem.type = "text";
  } else {
    elem.type = "password";
  }
}
function genpassA(){
  let newPassword = document.querySelector(".new-password");
  newPassword.value = generatePassword()
}
function genpassE(){
  let editPassword = document.querySelector(".edit-password");
  editPassword.value = generatePassword()
}
function generatePassword() {
  var length = 12,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[];:><,.?!@#$%^&*()~-_+=",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}
function JustUse(){
    localStorage.setItem("bearer","false")
}


