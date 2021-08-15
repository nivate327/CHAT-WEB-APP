const socket=io();

const form=document.getElementById("send-container");
const msgIput=document.getElementById("msgtype");
const msgContainer=document.querySelector(".container");
const msgbox=document.querySelector(".allmsg");
var audio=new Audio("ting.mp3");

const append=(msg, position)=>
{
    const msgElem=document.createElement("div");
    msgElem.innerHTML=msg;
    msgElem.classList.add("msg");
    msgElem.classList.add(position);
    msgbox.append(msgElem);

    if(position==="left")
    {
        audio.play();
    }
    
}

form.addEventListener("submit", (e)=>
{
    e.preventDefault();
    let msg=msgIput.value;
    append(`You :${msg} `, "right");
    socket.emit("send", msg);
    msgIput.value="";
})

const name=prompt("Enter Your Name to Join ?");
socket.emit("new-user-joined", name);

socket.on("user-joined", name=>
{
    append(`${name} joined chat`,"left");
})

socket.on("receive", data=>
{
    append(`${data.name} : ${data.message}`,"left")
})

socket.on("left", data=>
{
    append(`${name} : Left the chat`,"left")
})