const socket = io()

function sendMessage(){
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value
    const date = new Date().toLocaleDateString()
    
    socket.emit('chatData', `${date}: ${email} dice ${message}`)
    
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

const titles = `<h2>Listado de productos</h2>
                <div class="products__container__titles">
                    <p class="product__id">ID</p>
                    <p class="product__title">NOMBRE</p>
                    <p class="product__price">PRECIO</p>
                    <p class="product__image__container">IMAGEN</p>
                </div>`

socket.on('chatList', (data) =>{
    const chatList = data.reduce((chatList, item) => chatList + '<div>' + item + '</div>')
    document.getElementById('chat').innerHTML = chatList
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
                    <img class="product__image" src="${current.thumbnail}" alt="Imagen no disponible">
                </div>
            </div>`, ''
        )

        document.getElementById('products__container').innerHTML = titles + html
    }
})