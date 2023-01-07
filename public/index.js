const socket = io()

let notificationMessage = ''
let backgroundColor = ''

const productAmount = document.getElementById('productAmount')

const addToCart = (productId) => {
    const path = '/carrito/' + productId

    const itemQuantity = { quantity: parseInt(productAmount.innerHTML) }

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemQuantity)
    }

    fetch(path, requestInit)
        .then(res => res.json())
        .then(res => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify('Producto agregado con éxito'))
                window.location.href = '/productos'
            } else {
                notificationMessage = 'Error al agregar el producto'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const viewProductDetail = (productId) => {
    window.location.href = '/productos/form/' + productId
}

const formProduct = (productId) => {
    window.location = ''
    window.location.href = '/productos/form/' + productId
}

const getCheckout = () => {
    window.location.href = '/orden'
}

const deleteProduct = (productId) => {
    const path = '/productos/' + productId

    const requestInit = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }

    fetch(path, requestInit)
        .then((res) => res.json())
        .then((res) => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify(res.message))
                window.location.reload()
            } else {
                notificationMessage = 'Error al habilitar / eliminar el producto'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const enableProduct = (productId) => {
    const path = '/productos/habilitar/' + productId

    const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    }

    fetch(path, requestInit)
        .then((res) => res.json())
        .then((res) => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify(res.message))
                window.location.reload()
            } else {
                notificationMessage = 'Error al habilitar / eliminar el producto'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const updateProduct = (event) => {
    event.preventDefault()

    let category = ''
    document.getElementById('category').value == 'Equipo de fútbol'
        ? category = 'team'
        : category = 'national'

    const productToUpdate = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        image: document.getElementById('image').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        category
    }

    const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToUpdate)
    }

    const path = '/productos/' + productToUpdate.id

    fetch(path, requestInit)
        .then((res) => res.json())
        .then((res) => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify(res.message))
                window.location.href = '/productos'
            } else {
                notificationMessage = 'Error al modificar el producto'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const saveProduct = (event) => {
    event.preventDefault()

    let category = ''
    document.getElementById('category').value == 'Equipo de fútbol'
        ? category = 'team'
        : category = 'national'

    const productToSave = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        image: document.getElementById('image').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        category
    }

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSave)
    }

    const path = '/productos'

    fetch(path, requestInit)
        .then((res) => res.json())
        .then((res) => {
            if (res.statusCode == 201) {
                localStorage.setItem('message', JSON.stringify(res.message))
                window.location.href = '/productos'
            } else {
                notificationMessage = 'Error al agregar el producto'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const deleteProductToCart = (productId) => {
    const path = '/carrito/' + productId

    const requestInit = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(path, requestInit)
        .then(res => res.json())
        .then(res => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify('Producto eliminado con éxito'))
                window.location.reload()
            } else {
                notificationMessage = 'Error al eliminar el producto del carrito'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const cleanCart = (userId) => {
    const path = '/carrito/vaciar/' + userId

    const requestInit = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(path, requestInit)
        .then(res => res.json())
        .then(res => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify('Su carrito fue vaciado!'))
                window.location.reload()
            } else {
                notificationMessage = 'Error al vaciar el carrito'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const updateUser = (event) => {
    event.preventDefault()

    const username = document.getElementById('name').value
    const address = document.getElementById('address').value
    const age = parseInt(document.getElementById('age').value)
    const phone = document.getElementById('phone').value

    const userToUpdate = {
        username,
        address,
        age,
        phone
    }

    const path = '/usuario'

    const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToUpdate)
    }

    fetch(path, requestInit)
        .then(res => res.json())
        .then(res => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify(res.message))
                window.location.href = '/productos'
            } else {
                notificationMessage = 'Se produjo un error al intentar actualizar el usuario'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const categoryRefresh = (event) => {
    event.preventDefault()

    if (event.target.value == 'Todos') {
        window.location.href = '/productos'
    } else {
        let category = ''
        event.target.value == 'Equipo de fútbol'
            ? category = 'team'
            : category = 'national'

        window.location.href = '/productos/categoria/' + category
    }
}

const orderForm = (event) => {
    event.preventDefault()

    const deliveryAddress = document.getElementById('deliveryAddress').value
    const paymentMethod = document.getElementById('paymentMethod').value

    const primaryOrden = {
        deliveryAddress,
        paymentMethod
    }

    const path = '/orden'

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(primaryOrden)
    }

    fetch(path, requestInit)
        .then(res => res.json())
        .then(res => {
            if (res.statusCode == 201) {
                localStorage.setItem('message', JSON.stringify(res.message))
                window.location.href = '/productos'
            } else {
                res.message.includes('No hay stock suficiente')
                    ? notificationMessage = res.message
                    : notificationMessage = 'Error al generar la orden de compra'

                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const updateOrder = (orderNumber) => {
    const path = '/orden/' + orderNumber

    const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(path, requestInit)
        .then(res => res.json())
        .then(res => {
            if (res.statusCode == 200) {
                localStorage.setItem('message', JSON.stringify(res.message))
                window.location.href = '/orden/todas'
            } else {
                notificationMessage = 'Se produjo un error al intentar actualizar la orden'
                backgroundColor = '#F23030'
                showMessage(notificationMessage, backgroundColor)
            }
        })
        .catch((error) => {
            notificationMessage = 'Error inesperado'
            backgroundColor = '#F23030'
            showMessage(notificationMessage, backgroundColor)
        })
}

const getChatForm = (userEmail) => {
    localStorage.setItem('currentEmail', JSON.stringify(userEmail))

    window.location.href = '/chat'
}

const showMessage = (notificationMessage, backgroundColor) => {
    Toastify({
        text: notificationMessage,
        style: {
            color: "#FFFFFF",
            background: backgroundColor,
            duration: 2000,
            stopOnFocus: true,
        }
    }).showToast()
}

const addUnit = (productStock) => {
    const currentValue = parseInt(productAmount.innerText)

    currentValue < productStock
        ? productAmount.innerHTML = currentValue + 1
        : productAmount.innerHTML = currentValue
}

const subtractUnit = () => {
    const currentValue = parseInt(productAmount.innerText)

    currentValue > 1
        ? productAmount.innerHTML = currentValue - 1
        : productAmount.innerHTML = currentValue
}

const checkMessage = () => {
    if (localStorage.getItem('message') !== null) {

        const message = JSON.parse(localStorage.getItem('message'))

        message.includes('Error')
            ? backgroundColor = '#F23030'
            : backgroundColor = '#0B550E'

        showMessage(message, backgroundColor)

        localStorage.removeItem('message')
    }
}

checkMessage()