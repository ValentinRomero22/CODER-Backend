const socket = io()

socket.on('generic-data', (data) => {
    console.log(data)
})

function sendMessage(){
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value
    
    socket.emit('chatData', email + " dice " + message)
    
    return false
}

function saveProduct(){
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    
    const product = {
        title, 
        price,
        thumbnail
    }

    socket.emit('productData', product)
    
    return false
}

socket.on('chatList', (data) =>{
    console.log('aca')
    const chatList = data.reduce((chatList, item) => chatList + '<div id="chat-item">' + item + '</div>')
    document.getElementById('chat').innerHTML = chatList
})

socket.on('productList', (data) =>{
    const html = data.map(item => {
        return `<p>${item.title}</p>`
    })

    document.getElementById('catalog').innerHTML = html

    /* const chatList = data.reduce((chatList, item) => chatList + '<div>' + item.title + '</div>')
    document.getElementById('chat').innerHTML = chatList */
})