let message
let backgroundColor

const addToCart = (productId) => {
    const path = window.location.href + 'cart/' + productId

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(path, requestInit)
        .then((res) => {
            if (res.status == 200) {
                message = 'Producto agregado con éxito'
                backgroundColor = '#0B550E'
                showMessage(message, backgroundColor)
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

const formProduct = (productId) => {
    window.location.href = 'product/form/' + productId
}

const deleteProduct = (productId) => {
    const path = '/cart/product/' + productId

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
        price: document.getElementById('price').value,
        isAlternative: document.getElementById('isAlternative').checked,
        isTeam: document.getElementById('isTeam').checked
    }

    const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToUpdate)
    }

    const path = '/product/' + productToUpdate.id

    fetch(path, requestInit)
        .then((res) => {
            if (res.status == 200) {
                message = 'Producto modificado correctamente'
                backgroundColor = '#0B550E'
                showMessage(message, backgroundColor)
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

    setTimeout(() => window.location.href = '/', 2000)
}

const saveProduct = (event) => {
    event.preventDefault()

    const productToSave = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        image: document.getElementById('image').value,
        price: document.getElementById('price').value,
        isAlternative: document.getElementById('isAlternative').checked,
        isTeam: document.getElementById('isTeam').checked
    }

    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSave)
    }

    const path = '/product'

    fetch(path, requestInit)
        .then((res) => {
            if (res.status == 200) {
                message = 'Producto agregado correctamente'
                backgroundColor = '#0B550E'
                showMessage(message, backgroundColor)
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

    setTimeout(() => window.location.href = '/', 2000)
}

const deleteProductToCart = (productId) => {
    const path = '/cart/' + productId

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

const cleanCart = (userId) => {
    const path = '/cart/clean/' + userId

    const requestInit = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(path, requestInit)
        .then((res) => {
            if (res.status == 200) {
                message = 'Su carrito fue vaciado!'
                backgroundColor = '#0B550E'
                showMessage(message, backgroundColor)
                window.location.reload()
            } else {
                message = 'Error al vaciar el carrito'
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