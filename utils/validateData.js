const idValidator = (id) => {
    let isValidId

    id.length === 24
        ? isValidId = true
        : isValidId = false

    return isValidId
}

const productValidator = (productToValidate) => {
    let { name, description, code, price, category } = productToValidate

    if (name.trim() == '' || description.trim() == '' || code.trim() == '' || category.trim() == '') return false

    if (price < 1) return false

    if (category.toUpperCase() != 'TEAM' && category.toUpperCase() != 'NATIONAL') return false

    return true
}

const userValidator = (userToValidate) => {
    if (!userToValidate) return false

    let { username, address, age, phone } = userToValidate

    if (username.trim() == '' || username.length > 100) return false

    if (address.trim() == '' || address.length > 100) return false

    if (isNaN(age) || age < 1) return false

    if (phone.trim() == '') return false

    return true
}

const cartValidator = (cartToValidate) => {
    if (!cartToValidate) return false

    const isValidUser = userValidator(cartToValidate.user)
    if (!isValidUser) return false

    const isValidProduct = true
    for (let i; i < cartToValidate.products.length; i++) {
        isValidProduct = productValidator(cartToValidate.products[i])

        if (isValidProduct == false) {
            return isValidProduct
        }
    }

    return true
}

const emailValidator = (emailToValidate) => {
    //validar email!!!!!!!!!!!!!!!
    return true
}

const orderValidator = (orderToValidate) => {
    if (!orderToValidate) return false

    const isValidId = idValidator(orderToValidate.userId.valueOf())
    if (!isValidId) return false

    const isValidEmail = emailValidator(orderToValidate.userEmail)
    if (!isValidEmail) return false

    if (orderToValidate.paymentMethod != 'Efectivo' && orderToValidate.paymentMethod != 'Crédito' && orderToValidate.paymentMethod != 'Débito') return false

    if (orderToValidate.deliveryAddress.trim() == '') return false

    return true
}

module.exports = {
    idValidator,
    productValidator,
    userValidator,
    cartValidator,
    emailValidator,
    orderValidator
}