import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { productValidate } from "../services/validateData"
import useNotification from "../hooks/useNotification"
import Louder from "./Louder"

const EditProductForm = () => {
    const showNotification = useNotification()

    const navigate = useNavigate()

    const { id } = useParams()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [currentProduct, setCurrentProduct] = useState({})

    useEffect(() => {
        fetch(`http://localhost:8080/product/${id}`)
            .then(res => res.json())
            .then(res => setCurrentProduct(res.data))
            .catch(res => {
                showNotification(res.message, 'error')
            })

        setLoading(false)
    }, [id])

    const { name, description, code, image, price, stock, isAlternative, isTeam } = currentProduct

    const editProduct = (e) => {
        e.preventDefault()

        const errorMessage = productValidate(currentProduct)

        if (errorMessage) {
            (showNotification(errorMessage, 'error'))
        } else {
            const requestInit = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentProduct)
            }

            fetch('http://localhost:8080/product/' + id, requestInit)
                .catch(error => setError(true))

            showNotification('Producto editado correctamente', 'ok')

            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
    }

    const onChange = (e) => {
        let newValue

        if (e.target.id === 'price' || e.target.id === 'stock') {
            newValue = parseInt(e.target.value)
        } else if (e.target.id === 'isTeam' || e.target.id === 'isAlternative') {
            newValue = e.target.checked
        } else {
            newValue = e.target.value
        }

        setCurrentProduct({
            ...currentProduct,
            [e.target.name]: newValue
        })
    }

    if (loading) {
        return (<Louder />)
    }

    if (error) return (showNotification('Se producjo un error inesperado', 'error'))

    return (
        <div className="product__form__container">
            <form onSubmit={e => { editProduct(e) }}>
                <h2>Editar producto</h2>
                <label htmlFor="name" className="form__label">Nombre</label>
                <input
                    value={name || ''}
                    id="name"
                    name="name"
                    type="text"
                    autoFocus
                    onChange={onChange} />
                <label htmlFor="description" className="form__label">Descripción</label>
                <input
                    value={description || ''}
                    id="description"
                    name="description"
                    type="text"
                    onChange={onChange} />
                <label htmlFor="code" className="form__label">Código</label>
                <input
                    value={code || ''}
                    id="code"
                    name="code"
                    type="text"
                    onChange={onChange} />
                <label htmlFor="image" className="form__label">Imagen</label>
                <input
                    value={image || ''}
                    id="image"
                    name="image"
                    type="text"
                    onChange={onChange} />
                <label htmlFor="price" className="form__label">Precio</label>
                <input
                    value={price || ''}
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    onChange={onChange} />
                <label htmlFor="stock" className="form__label">Stock</label>
                <input
                    value={stock || ''}
                    id="stock"
                    name="stock"
                    type="number"
                    onChange={onChange} />
                <label htmlFor="isAlternative" className="form__label">Es alternativa?</label>
                <div className="check__form__container">
                    <input
                        checked={isAlternative || false}
                        id="isAlternative"
                        name="isAlternative"
                        type="checkbox"
                        onChange={onChange} />
                </div>
                <label htmlFor="isTeam" className="form__label">Es de un equipo? No marcar si pertenece a una selección</label>
                <div className="check__form__container">
                    <input
                        checked={isTeam || false}
                        id="isTeam"
                        name="isTeam"
                        type="checkbox"
                        onChange={onChange} />
                </div>
                <button type="submit" className="button button--main">Guardar</button>
            </form>
        </div>
    )
}

export default EditProductForm