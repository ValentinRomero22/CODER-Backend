let message
let backgroundColor

let catalog = document.getElementById("catalog")

const showProducts = (products) => {
    catalog.innerHTML = ''
    if (products.length > 0) {
        for (product of products) {
            const { _id, name, price, image } = product

            catalog.innerHTML += `<div class="product">
                <img src="${image}" alt="${name}" />
                <div class="product__name__container">
                    <p>${name}</p>
                </div>
                <div class="product__price__container">
                    <p>$ ${price}</p>
                </div>
                <button name="btnEditar" onclick="formProduct('${_id}')" class="button button--change">
                    Editar
                </button>
                <button name="btnEliminar" onclick="deleteProduct('${_id}')" class="button button--delete">
                    Eliminar
                </button>
            </div>`
        }

        catalog.innerHTML += '</div>'
    } else {
        catalog.innerHTML += `<h3>NO HAY PRODUCTOS!</h3>`
    }
}

const getProducts = () => {
    fetch('/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `{
                getProducts{
                    _id, name, image, price,
                  }
              }`
        })
    })
        .then(res => res.json())
        .then(res => showProducts(res.data.getProducts))
        .catch((error) => { 
            message = 'Error al cargar los productos'
            backgroundColor = '#F23030'
            showMessage(message, backgroundColor)
        })
}

getProducts()

const deleteProduct = (productId) => {
    fetch('/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `mutation {
                deleteProduct(id: "${productId}"){
                    name
                  }
              }`
        })
    })
        .then((res) => {
            message = 'Producto eliminado correctamente'
            backgroundColor = '#0B550E'
            showMessage(message, backgroundColor)
            setTimeout(() => window.location.reload(), 2000)
        })
        .catch((error) => {
            message = 'Error al agregar el editar'
            backgroundColor = '#F23030'
            showMessage(message, backgroundColor)
        })
}

const formProduct = (productId) => {
    window.location.href = 'form/' + productId
    localStorage.setItem('productId', JSON.stringify(productId))
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