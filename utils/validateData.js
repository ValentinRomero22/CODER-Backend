const idValidator = (id) => {
    let isValid = true

    if (id?.length != 24) isValid = false

    return isValid
}

const productValidator = (productToValidate) => {
    let isValid = true

    let { name, description, code, price, isAlternative, isTeam } = productToValidate

    if (name.trim() == '' || description.trim() == '' || code.trim() == '') isValid = false

    if (price < 0) isValid = false

    if (typeof isAlternative != 'boolean' || typeof isTeam != 'boolean') isValid = false

    return isValid
}

const userValidator = (userToValidate) => {
    if (!userToValidate) return false
}

const cartValidator = (cartToValidate) => {
    const isValidUser = userValidator(cartToValidate.user)
    if(!isValidUser) return false
    
    const isValidProduct = true
    for(let i; i < cartToValidate.products.length; i++){
        isValidProduct = productValidator(cartToValidate.products[i])

        if(isValidProduct == false){
            return false
        } 
    }
}

module.exports = {
    idValidator,
    productValidator,
    userValidator,
    cartValidator
}