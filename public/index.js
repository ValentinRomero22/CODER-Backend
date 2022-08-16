console.log('aca')
const socket = io()
console.log('otro aca')

socket.on("connect", () => {
    console.log("Conectado...")
})

socket.on("generic-data", (data) => {
    console.log(data)
})

function send() {
    const email = document.getElementById('email')
    const message = document.getElementById('message')
    socket.emit("generic-data", email + " dice " + message)
    return false
}

socket.on("arr-chat", (data) => {
    const chatList = data.reduce((chatList, item) => chatList + "<div>" + item + "</div>", " ")
    document.getElementById('chat').innerHTML = chatList
})