const socket = io()

fetch("http://localhost:8080/api/productos-test")
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        const products = res.map((product) => {
            return `<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td><img src=${product.image} alt=${product.name}></td>
                    </tr>`
        })

        document.getElementById('products__container').innerHTML = products
    })

function sendMessage() {
    //debugger
    //e.preventDefault()
    const message = {
        author: {
            id: document.getElementById('user').value ,
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            alias: document.getElementById('alias').value,
            age: document.getElementById('age').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('text').value,
    }

    console.log(message)

    socket.emit('newMessage', JSON.stringify(message))
    console.log('aca')
    document.getElementById('text').value = ''
}

const titles = `<h2>Listado de productos</h2>
                    <div class="products__container__titles">
                        <p class="product__id">ID</p>
                        <p class="product__title">NOMBRE</p>
                        <p class="product__price">PRECIO</p>
                        <p class="product__image__container">IMAGEN</p>
                    </div>`

socket.on('messages', (data) => {
    let denormalizedChat = denormalize(data)
    let compression = (JSON.stringify(denormalizedChat).length / JSON.stringify(data).length) * 100

    document.getElementById('compression_status').value = `El porcentaje de compresion es de %${compression.toString().slice(0, 5)}`

    if (data.length != 0) {
        const chatList = data.reduce((chatList, item) => chatList +
            `<div>
                <p>${new Date(item.datetime).toLocaleDateString()} | ${item.user}: ${item.message}</p>
            </div>`)
        document.getElementById('chat').innerHTML = chatList
    }
})

const denormalize = (data) =>{
    const author = new normalizr.schema.Entity('authors')
    const messages = new normalizr.schema.Entity('messages', { author: author })

    const chats = new normalizr.schema.Entity('chats', { chats: [messages] })

    const denormalizedMessages = normalizr.denormalize(
        data.result, 
        chats, 
        data.entities
    )

    return denormalizedMessages
}