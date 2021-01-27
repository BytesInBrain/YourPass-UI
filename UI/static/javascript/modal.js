let modalBtn = document.querySelector(".addacc");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".btn-cancel");

// open modal
modalBtn.addEventListener("click", function () {
  modalBg.classList.add("bg-active");
});

// close modal
modalClose.addEventListener("click", function (e) {
  e.preventDefault();
  modalBg.classList.remove("bg-active");
});

document.addEventListener("click",function(e){
  console.log(e.target)
})