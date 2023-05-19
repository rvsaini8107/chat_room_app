const socket = io() 
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector('.message__area');

do {
    name = prompt("Please Enter Your Name: \n Name length min 3").trim()
}while(!name && name !=null)

if(name==""){
    name="user"
}

textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(ms) {
    let msg = {
        user: name,
        message:ms.trim()
    }
    // append in div
    appendMessage(msg, "outgoing")
    scrollToBottom()
    textarea.value = ""

    // Send to server
    socket.emit('message',msg) 

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,"message")
    let markup = `<h4>${msg.user}</h4>
    <p>${msg.message}</p>`;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)

}

// recieved message

socket.on("message",(msg)=>{
    console.log(msg);
    appendMessage(msg,"incoming")
    scrollToBottom(); 
})

//scroll 
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}