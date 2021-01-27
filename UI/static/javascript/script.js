function tableelem(accName,userName,Email,Password){
    let tbody = document.getElementById("thetable").getElementsByTagName("tbody")[0]
    let newRow = tbody.insertRow(-1)
    //5
    let newCell = newRow.insertCell(0);
    newCell.className = "acc-icon"
    let i1 = document.createElement("i");
    i1.classList="fas fa-edit"
    let i2 = document.createElement("i");
    i2.classList="fas fa-trash"
    newCell.appendChild(i1)
    newCell.appendChild(i2)
   //4
   newCell = newRow.insertCell(0);
   newCell.className = "acc-password"
   let newText = document.createTextNode(Password);
   newCell.appendChild(newText)
   //3
   newCell = newRow.insertCell(0);
   newCell.className = "acc-email"
   newText = document.createTextNode(Email);
   newCell.appendChild(newText)

   //2
   newCell = newRow.insertCell(0);
   newCell.className = "acc-username"
   newText = document.createTextNode(userName);
   newCell.appendChild(newText)

   //1
   newCell = newRow.insertCell(0);
   newCell.className = "acc-name"
   newText = document.createTextNode(accName);
   newCell.appendChild(newText)
};

fetch('http://localhost:8080/api/v1/account')
  .then(response => response.json())
  .then(data => {
    for(i in data.accounts){
        let elem = tableelem(data.accounts[i].accName,data.accounts[i].userName,data.accounts[i].email,data.accounts[i].password);
    }
  });

