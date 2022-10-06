const socket = io()

function sendMessage(e) {
    e.preventDefault()
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
    
    socket.emit('newMessage', JSON.stringify(message))
    document.getElementById('text').value = ''

    return false
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

    document.getElementById('compression_status').innerText = `El porcentaje de compresion es de %${compression.toString().slice(0, 5)}`
    
    if (denormalizedChat.length != 0) {
        const chatList = denormalizedChat.chats.map((chat) =>{
            const date = new Date(chat.date)
            const formatedDate = date.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2")

            return `<div class='item_chat_container'>
                        <span class='item_chat_id'>${chat.author.id}</span>
                        <span class='item_chat_date'>[${formatedDate}]:</span>
                        <span class='item_chat_text'>${chat.text}</span>
                        <img class='image_avatar' src='${chat.author.avatar}' alt='${chat.author.id}'></img>
                    </div>`
        }).join(' ')

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