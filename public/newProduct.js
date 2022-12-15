let message
let backgroundColor

const saveProduct = (event) => {
    event.preventDefault()

    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const image = document.getElementById('image').value
    const stock = parseInt(document.getElementById('stock').value)
    const price = parseInt(document.getElementById('price').value)
    const isAlternative = document.getElementById('isAlternative').checked
    const isTeam = document.getElementById('isTeam').checked

    fetch('/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `mutation {
                createProduct(data: {
                  name: "${name}",
                  description: "${description}",
                  code: "${code}",
                  price: ${price},
                  stock: ${stock},
                  image: "${image}",
                  isTeam: ${isTeam},
                  isAlternative: ${isAlternative}
                }) {
                  _id
                }
              }`
        })
    })
        .then((res) => {
            message = 'Producto agregado correctamente'
            backgroundColor = '#0B550E'
            showMessage(message, backgroundColor)
            setTimeout(() => window.location.href = '/', 2000)
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