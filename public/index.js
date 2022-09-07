const socket = io()

function sendMessage(){
    const user = document.getElementById('user').value
    const message = document.getElementById('text').value
    const dateTime = Date.now()

    const chat = { user, message, dateTime }
    
    socket.emit('chatData', chat)
    
    return false
}

function saveProduct(){
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const image = document.getElementById('image').value
    
    const product = { title, price, image }
    
    socket.emit('productData', product)
    
    return false
}

const titles = `<h2>Listado de productos</h2>
                <div class="products__container__titles">
                    <p class="product__id">ID</p>
                    <p class="product__title">NOMBRE</p>
                    <p class="product__price">PRECIO</p>
                    <p class="product__image__container">IMAGEN</p>
                </div>`

socket.on('chatList', (data) =>{
    if(data.length != 0){
        const chatList = data.reduce((chatList, item) => chatList + 
        `<div>
            <p>${new Date(item.datetime).toLocaleDateString()} | ${item.user}: ${item.message}</p>
        </div>`)
        document.getElementById('chat').innerHTML = chatList
    }
})

socket.on('productList', (data) =>{ 

    if(data.length == 0){
        const html = '<h2>Listado de productos</h2><p class="products__container__message">No hay productos!</p>'
        document.getElementById('products__container').innerHTML = html        
    }
    else{
        const html = data.reduce((preview, current) => preview + 
            `<div class="product">
                <p class="product__id">${current.id}</p>
                <p class="product__title">${current.title}</p>
                <p class="product__price">$ ${current.price}</p>
                <div class="product__image__container">
                    <img class="product__image" src="${current.image}" alt="Imagen no disponible">
                </div>
            </div>`, ''
        )

        document.getElementById('products__container').innerHTML = titles + html
    }
})