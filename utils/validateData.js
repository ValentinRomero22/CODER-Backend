const idValidator = (id) =>{
    let isValid = true
    
    if(id?.length != 24) isValid = false

    return isValid
}

const productValidator = (productToValidate) =>{
    let isValid = true
    
    let { id, name, description, code, image, price, isAlternative, isTeam } = productToValidate

    if(name.trim() == '' || description.trim() == '' || code.trim() == '' || image.trim() == '') isValid = false

    if(price < 0) isValid = false
    
    if(typeof isAlternative != 'boolean' || typeof isTeam != 'boolean') isValid = false

    return isValid
}

const cartValidator = (cartToValidate) =>{
    
}

const userValidator = (userToValidate) =>{
    let isValid = true

    if(userToValidate) isValid = false

    return isValid
}

const messageValidator = (messageToValidate) =>{
    let isValid = true

    if(messageToValidate.text.trim().length == 0) isValid = false

    return isValid
}

module.exports = { 
    idValidator, 
    productValidator, 
    cartValidator, 
    userValidator,
    messageValidator
}