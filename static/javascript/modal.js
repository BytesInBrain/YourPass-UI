let modalBtn = document.querySelector(".addacc");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".btn-cancel");
let modalAdd = document.querySelector(".btn-add");
let noteBody = document.querySelector(".note-table");

// open modal
modalBtn.addEventListener("click", function () {
  modalBg.classList.add("bg-active");
});

// close modal
modalClose.addEventListener("click", function (e) {
  e.preventDefault();
  let newAcc = document.querySelector(".new-acc");
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
  let newAcc = document.querySelector(".new-acc");
  let newEmail = document.querySelector(".new-email");
  let newUsername = document.querySelector(".new-username");
  let newPassword = document.querySelector(".new-password");
  let note = document.createElement("tr");
  note.innerHTML = `  
  <td class="acc-name">${newAcc.value}</td>
  <td class="acc-username">${newEmail.value}</td>
  <td class="acc-email">${newUsername.value}</td>
  <td class="acc-password">${newPassword.value}</td>
  <td class="acc-icon">
  <i class="fas fa-edit"></i>
  <i class="fas fa-trash"></i>
  </td>
  `;
  newAcc.value = "";
  newEmail.value = "";
  newUsername.value = "";
  newPassword.value = "";
  modalBg.classList.remove("bg-active");
  noteBody.appendChild(note);
  e.preventDefault();
});

// delete account
