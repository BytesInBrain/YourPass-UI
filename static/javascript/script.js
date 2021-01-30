let modalBtn = document.querySelector(".addacc");
let modalBg = document.querySelector(".addModal");
let modalClose = document.querySelector(".btn-cancel");
let modalAdd = document.querySelector(".btn-add");
let accTable = document.querySelector(".acc-table");
// show Accounts
showAccounts();

function showAccounts() {
  let acc = localStorage.getItem("accounts");
  if (acc == null) {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }

  let html = "";
  accObj.forEach(function (element, index) {
    html += `
    <tr id = "acc${index}" class="acc-body">
      <td class="acc-name">${element.account}</td>
      <td class="acc-username">${element.username}</td>
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
  if (acc == null) {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }
  accObj.splice(index, 1);
  localStorage.setItem("accounts", JSON.stringify(accObj));
  showAccounts(accObj);
}

// copy to clipboard

function copyAcc(index) {
  let acc = localStorage.getItem("accounts");
  if (acc == null) {
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
  if (acc == null) {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }

  let editAcc = document.querySelector(".edit-account");
  let editEmail = document.querySelector(".edit-email");
  let editUsername = document.querySelector(".edit-username");
  let editPassword = document.querySelector(".edit-password");

  let editBtn = document.querySelector(".btn-edit");
  let editCancel = document.querySelector(".btn-edit-cancel");

  editAcc.value = accObj[index].account;
  editEmail.value = accObj[index].email;
  editUsername.value = accObj[index].username;
  editPassword.value = accObj[index].password;

  let editModal = document.querySelector(".editModal");
  editModal.classList.add("bg-active");

  editBtn.addEventListener("click", function (e) {
    e.preventDefault();

    accObj[index].account = editAcc.value;
    accObj[index].email = editEmail.value;
    accObj[index].username = editUsername.value;
    accObj[index].password = editPassword.value;

    localStorage.setItem("accounts", JSON.stringify(accObj));
    editModal.classList.remove("bg-active");
    showAccounts(accObj);
  });

  editCancel.addEventListener("click", function (e) {
    e.preventDefault();

    editAcc.value = "";
    editEmail.value = "";
    editUsername.value = "";
    editPassword.value = "";

    editModal.classList.remove("bg-active");
  });
}

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
  if (acc == null) {
    accObj = [];
  } else {
    accObj = JSON.parse(acc);
  }
  let myObj = {
    account: newAcc.value,
    email: newEmail.value,
    username: newUsername.value,
    password: newPassword.value,
  };
  accObj.push(myObj);
  localStorage.setItem("accounts", JSON.stringify(accObj));

  newAcc.value = "";
  newEmail.value = "";
  newUsername.value = "";
  newPassword.value = "";
  modalBg.classList.remove("bg-active");

  showAccounts();
  e.preventDefault();
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
