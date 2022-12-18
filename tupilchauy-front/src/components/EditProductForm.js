import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const EditProductForm = () => {
    const { id } = useParams()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [currentProduct, setCurrentProduct] = useState({})

    useEffect(() => {
        setLoading(true)

        fetch(`http://localhost:8080/product/${id}`)
            .then(response => response.json())
            .then(result => setCurrentProduct(result.data))
            .catch(error => setError(true))

        setLoading(false)
    }, [id])

    const { name, description, code, image, price, stock, isAlternative, isTeam } = currentProduct

    const editProduct = (e) => {
        if (currentProduct.name === '' || currentProduct.description === '' || currentProduct.code === '' || currentProduct.image === '' ||
            isNaN(currentProduct.price) || isNaN(currentProduct.stock)) {
            e.preventDefault()
            alert('Por favor, ingrese la información requierda correctamente')
            return
        }

        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentProduct)
        }

        try {
            fetch('http://localhost:8080/product/' + id, requestInit)
                .then(res => res.json())
                .catch(error => setError(true))
        } catch (error) {
            setError(true)
        }

        setCurrentProduct({
            name: "",
            description: "",
            code: "",
            image: "",
            price: 0,
            stock: 0
        })
    }

    const onChange = (e) => {
        setCurrentProduct({
            ...currentProduct,
            [e.target.name]: e.target.value
        })
    }

    if (error) {
        return (
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return (
        <form onSubmit={e => { editProduct(e) }}>
            <label htmlFor="name" className="form__label">Nombre</label>
            <input value={name || ''} id="name" name="name" onChange={onChange} type="text" />
            <label htmlFor="description" className="form__label">Descripción</label>
            <input value={description || ''} id="description" name="description" onChange={onChange} type="text" />
            <label htmlFor="code" className="form__label">Código</label>
            <input value={code || ''} id="code" name="code" onChange={onChange} type="text" />
            <label htmlFor="image" className="form__label">Imagen</label>
            <input value={image || ''} id="image" name="image" onChange={onChange} type="text" />
            <label htmlFor="price" className="form__label">Precio</label>
            <input value={price || ''} id="price" name="price" onChange={onChange} type="number" min={0} />
            <label htmlFor="stock" className="form__label">Stock</label>
            <input value={stock || ''} id="stock" name="stock" onChange={onChange} type="number" />
            <label htmlFor="isAlternative" className="form__label">Es alternativa?</label>
            <input value={isAlternative || ''} id="isAlternative" name="isAternative" onChange={onChange} type="checkbox" />
            <label htmlFor="isTeam" className="form__label">Es un de un equipo?</label>
            <input value={isTeam || ''} id="isTeam" name="isTeam" onChange={onChange} type="checkbox" />
            <button type="submit" className="button button--detail">Guardar</button>
        </form>
    )
}

export default EditProductForm