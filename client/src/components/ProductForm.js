import React, { useState } from "react";

const ProductForm = ({ product, setProduct }) =>{
    const [error, setError] = useState(false)

    const { name, description, code, image, price, stock } = product
    
    const newProduct = (e) =>{
        if(product.name === '' || product.description === '' || product.code === '' || product.image === '' ||
            isNaN(product.price) || isNaN(product.stock)){
            e.preventDefault()
            alert('Por favor, ingrese la información requierda correctamente')
            return
        }

        const requestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }

        try {
            fetch('http://localhost:8080/api/productos/', requestInit)
                .then(res => res.json())
                .catch(error => setError(true))
        } catch (error) {
            setError(true)
        }

        setProduct({
            name: "",
            description: "",
            code: "",
            image: "",
            price: 0,
            stock: 0
        })
    }

    const onChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    if (error){ 
        return(
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return(
        <form onSubmit={ e => { 
            newProduct(e)}}> 
            <label htmlFor="name" className="form__label">Nombre</label>
            <input value={name} id="name" name="name" onChange={onChange} type="text"/>
            <label htmlFor="description" className="form__label">Descripción</label>
            <input value={description} id="description" name="description" onChange={onChange} type="text"/>
            <label htmlFor="code" className="form__label">Código</label>
            <input value={code} id="code" name="code" onChange={onChange} type="text"/>
            <label htmlFor="image" className="form__label">Imagen</label>
            <input value={image} id="image" name="image" onChange={onChange} type="text"/>
            <label htmlFor="price" className="form__label">Precio</label>
            <input value={price} id="price" name="price" onChange={onChange} type="number" min={0} />
            <label htmlFor="stock" className="form__label">Stock</label>
            <input value={stock} id="stock" name="stock" onChange={onChange} type="number"/>
            <button type="submit" className="button button--detail">Guardar</button>
        </form>
    )
}

export default ProductForm