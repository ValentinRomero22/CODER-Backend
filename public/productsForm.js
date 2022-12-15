let message
let backgroundColor

const showProduct = (product) => {
    const { 
        _id, name, description, code, image, stock, price, isAlternative, isTeam
    } = product

    const idInput = document.getElementById('id')
    const nameInput = document.getElementById('name')
    const descriptionInput = document.getElementById('description')
    const codeInput = document.getElementById('code')
    const imageInput = document.getElementById('image')
    const stockInput = document.getElementById('stock')
    const priceInput = document.getElementById('price')
    const isAlternativeInput = document.getElementById('isAlternative')
    const isTeamInput = document.getElementById('isTeam')

    idInput.value = _id
    nameInput.value = name
    descriptionInput.value = description
    codeInput.value = code
    imageInput.value = image
    stockInput.value = stock
    priceInput.value = price
    isTeamInput.checked = isTeam
    isAlternativeInput.checked = isAlternative
}

const getProduct = () => {
    const productId = localStorage.getItem('productId')

    fetch('/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `{
                getProduct(id: ${productId}){
                    _id, name, description, code, image, stock, price, isAlternative, isTeam
                  }
              }`
        })
    })
        .then(res => res.json())
        .then(res => showProduct(res.data.getProduct))
        .catch((error) => { alert(error) })
}

getProduct()

const updateProduct = (event) => {
    event.preventDefault()

    const id = document.getElementById('id').value
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
                updateProduct(id: "${id}", data: {
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
            message = 'Producto editado correctamente'
            backgroundColor = '#0B550E'
            showMessage(message, backgroundColor)
            setTimeout(() => window.location.href = '/', 2000)
        })
        .catch((error) => {
            message = 'Error al agregar el editar'
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