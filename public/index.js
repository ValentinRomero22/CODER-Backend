const socket = io()

function sendMessage(e) {
    e.preventDefault()
    const message = {
        author: document.getElementById('user').value,
        text: document.getElementById('text').value,
    }
    
    socket.emit('newMessage', JSON.stringify(message))
    document.getElementById('text').value = ''

    return false
}

socket.on('messages', (data) => {
    let denormalizedChat = denormalize(data)
    let compression = (JSON.stringify(denormalizedChat).length / JSON.stringify(data).length) * 100

    document.getElementById('compression_status').innerText = `El porcentaje de compresion es de %${compression.toString().slice(0, 5)}`
    
    if (denormalizedChat.length != 0) {
        const chatList = denormalizedChat.chats.map((chat) =>{
            const date = new Date(chat.date)
            const formatedDate = date.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2")

            return `<div class='item_chat_container'>
                        <span class='item_chat_id'>${chat.author}</span>
                        <span class='item_chat_date'>[${formatedDate}]:</span>
                        <span class='item_chat_text'>${chat.text}</span>
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

let message
let backgroundColor

const formProduct = (productId) => {
    window.location.href = 'form/' + productId
}

const deleteProduct = (productId) => {
    const path = '/' + productId

    const requestInit = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(path, requestInit)
        .then((res) => {
            if (res.status == 200) {
                message = 'Producto eliminado correctamente'
                backgroundColor = '#0B550E'
                showMessage(message, backgroundColor)
                window.location.reload()
            } else {
                message = 'Error al eliminar el producto'
                backgroundColor = '#F23030'
                showMessage(message, backgroundColor)
            }
        })
        .catch((error) => {
            message = 'Error al eliminar el producto'
            backgroundColor = '#F23030'
            showMessage(message, backgroundColor)
        })
}

const updateProduct = (event) => {
    event.preventDefault()

    const productToUpdate = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseInt(document.getElementById('price').value),
        isAlternative: document.getElementById('isAlternative').checked,
        isTeam: document.getElementById('isTeam').checked
    }

    const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToUpdate)
    }

    const path = '/' + productToUpdate.id

    fetch(path, requestInit)
        .then((res) => {
            if (res.status == 200) {
                message = 'Producto modificado correctamente'
                backgroundColor = '#0B550E'
                showMessage(message, backgroundColor)
                setTimeout(() => window.location.href = '/', 2000)
            } else {
                message = 'Error al modificar el producto'
                backgroundColor = '#F23030'
                showMessage(message, backgroundColor)
            }
        })
        .catch((error) => {
            message = 'Error al modificar el producto'
            backgroundColor = '#F23030'
            showMessage(message, backgroundColor)
        })
}

const saveProduct = (event) => {
    event.preventDefault()

    const productToSave = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        image: document.getElementById('image').value,
        price: parseInt(document.getElementById('price').value),
        isAlternative: document.getElementById('isAlternative').checked,
        isTeam: document.getElementById('isTeam').checked
    }

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSave)
    }

    const path = '/newProduct'

    fetch(path, requestInit)
        .then((res) => {
            if (res.status == 200) {
                message = 'Producto agregado correctamente'
                backgroundColor = '#0B550E'
                showMessage(message, backgroundColor)
                setTimeout(() => window.location.href = '/', 2000)
            } else {
                message = 'Error al agregar el producto'
                backgroundColor = '#F23030'
                showMessage(message, backgroundColor)
            }
        })
        .catch((error) => {
            message = 'Error al agregar el producto'
            backgroundColor = '#F23030'
            showMessage(message, backgroundColor)
        })
}

const showMessage = (message, backgroundColor) => {
    Toastify({
        text: message,
        style: {
            color: "#FFFFFF",
            background: backgroundColor,
            duration: 2000,
            stopOnFocus: true,
        }
    }).showToast()
}