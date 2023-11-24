const Name = document.getElementById("ename").value;
const Nickname = document.getElementById("nename").value;
const button = document.getElementById("ball");
button.onclick = () =>{
    const Name = document.getElementById("ename").value;
    const Nickname = document.getElementById("nename").value;
    const button = document.getElementById("ball");
    // If the Names are not put send alert 

    if(Name === "" || Nickname === ""){
        alert("Enter Name and Nickname");
    }else{
        // Store the Names for the end page 
        localStorage.setItem('Name' , Name);
        localStorage.setItem('Nickname' , Nickname);
        location.href = "./game.html";
    }
}
console.log("Name:", Name);
console.log("Nickname:", Nickname);
