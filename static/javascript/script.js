function tableelem(accImage,accName,userName,Email,Password){
    let tabr = document.createElement("div")
    tabr.classList.add("tableRow")
    //1
    let accimg = document.createElement("div");
    accimg.classList.add("headerElm1");
    var img = document.createElement("img");
    img.src = accImage;
    img.setAttribute("class","logoimg")
    img.setAttribute("height","40");
    img.setAttribute("width","136");
    img.setAttribute("alt","No Image");
    accimg.appendChild(img);
    //2
    let accNamed = document.createElement("div");
    accNamed.classList.add("headerElm2");
    let accNameh4 = document.createElement("h4");
    accNameh4.innerHTML = accName
    accNamed.appendChild(accNameh4)
    //3
    let userNamed = document.createElement("div");
    userNamed.classList.add("headerElm3");
    let userNameh4 = document.createElement("h4");
    userNameh4.innerHTML = userName
    userNamed.appendChild(userNameh4)
    //4
    let emaild = document.createElement("div");
    emaild.classList.add("headerElm4");
    let emailh4 = document.createElement("h4");
    emailh4.innerHTML = Email
    emaild.appendChild(emailh4);
    //5
    let passd = document.createElement("div");
    passd.classList.add("headerElm5");
    let passh4 = document.createElement("h4");
    passh4.innerHTML = Password
    passd.appendChild(passh4)
    tabr.appendChild(accimg)
    tabr.appendChild(accNamed)
    tabr.appendChild(userNamed)
    tabr.appendChild(passd)
    return tabr;
};


const examples = [
    {
        "Account Image":"Netflix",
        "Account Name":"Netflix Acc",
        "Username":"rohitier",
        "Email":"vemruroof@jss.com",
        "Password":"rohitasd"
    },
    {
        "Account Image":"Netflix",
        "Account Name":"Netflix Acc",
        "Username":"rohitier",
        "Email":"vemruroof@jss.com",
        "Password":"rohitasd"
    },
    {
        "Account Image":"Netflix",
        "Account Name":"Netflix Acc",
        "Username":"rohitier",
        "Email":"vemruroof@jss.com",
        "Password":"rohitasd"
    },
    {
        "Account Image":"Netflix",
        "Account Name":"Netflix Acc",
        "Username":"rohitier",
        "Email":"vemruroof@jss.com",
        "Password":"rohitasd"
    },
    {
        "Account Image":"Netflix",
        "Account Name":"Netflix Acc",
        "Username":"rohitier",
        "Email":"vemruroof@jss.com",
        "Password":"rohitasd"
    }
]
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
const thetab = document.getElementById("tablef")
function main(){
    console.log(thetab)
    for(i in examples){
        let elem = tableelem("static/svgs/NoImage.svg",examples[i]["Account Name"],examples[i].Username,examples[i].Email,examples[i].Password);
        let x = thetab.childNodes[1]
        insertAfter(x,elem)
        console.log("inserted")
    }
}
main()
