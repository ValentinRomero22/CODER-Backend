export const productValidate = (data) => {
    if (data?.name.length === 0)
        return 'Ingrese el nombre del producto'

    if (data?.name.length > 30)
        return 'El nombre del producto no debe sobrepasar los 30 caracteres'

    if (data?.description.length === 0)
        return 'Ingrese la descripción del producto'

    if (data?.code.length === 0)
        return 'Ingrese el código del producto'

    if (data?.code.length > 15)
        return 'El código del producto no debe sobrepasar los 15 caracteres'

    if (data?.image.length === 0)
        return 'Ingrese la imágen del producto'

    if (isNaN(data?.price))
        return 'Ingrese el precio del producto'

    if (data?.price < 1)
        return 'Ingrese un precio válido'

    if (isNaN(data?.stock))
        return 'Ingrese el stock del producto'

    if (data?.stock < 1)
        return 'Ingrese un stock válido'
}