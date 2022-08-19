const socket = io()

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
    console.log('chatList')
    const chatList = data.reduce((chatList, item) => chatList + '<div id="chat-item">' + item + '</div>')
    document.getElementById('chat').innerHTML = chatList
})

socket.on('productList', (data) =>{
    console.log(data)
    const { id, title, price, thumbnail } = data
    console.log(id)

    const html = `<div class="product">
                    <p class="product__id">${{id}}</p>
                    <p class="product__title">${{title}}</p>
                    <p class="product__price">$ ${{price}}</p>
                    <div class="product__image__container">
                        <img class="product__image" src="${{thumbnail}}" alt="Imagen no disponible">
                    </div>
                </div>`

    /* document.getElementById('products__container').innerHTML = html */
    document.getElementById('products__container').innerHTML += html

    /* const chatList = data.reduce((chatList, item) => chatList + '<div>' + item.title + '</div>')
    document.getElementById('chat').innerHTML = chatList */
})