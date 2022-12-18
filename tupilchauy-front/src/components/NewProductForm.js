import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { productValidate } from "../services/validateData"
import useNotification from "../hooks/useNotification"

const NewProductForm = () => {
    const showNotification = useNotification()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [code, setCode] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [isAlternative, setIsAlternative] = useState(false)
    const [isTeam, setIsTeam] = useState(false)

    const newProduct = (e) => {
        e.preventDefault()

        const productToSave = {
            name, description, code, image, price, stock, isAlternative, isTeam
        }

        const errorMessage = productValidate(productToSave)

        if (errorMessage) {
            showNotification(errorMessage, 'error')
        } else {
            const requestInit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSave)
            }

            fetch('http://localhost:8080/product/', requestInit)
                .then(res => res.json())
                .then(res => {
                    showNotification(res.message, 'ok')
                })
                .catch(res => {
                    showNotification(res.message, 'error')
                })

            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
    }

    return (
        <div className="product__form__container">
            <form onSubmit={e => { newProduct(e) }}>
                <h2>Agregar nuevo producto</h2>
                <label htmlFor="name" className="form__label">Nombre</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoFocus
                    onChange={e => setName(e.target.value)} />
                <label htmlFor="description" className="form__label">Descripción</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={e => setDescription(e.target.value)} />
                <label htmlFor="code" className="form__label">Código</label>
                <input
                    id="code"
                    name="code"
                    type="text"
                    onChange={e => setCode(e.target.value)} />
                <label htmlFor="image" className="form__label">Imagen</label>
                <input
                    id="image"
                    name="image"
                    type="text"
                    onChange={e => setImage(e.target.value)} />
                <label htmlFor="price" className="form__label">Precio</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    onChange={e => setPrice(parseInt(e.target.value))} />
                <label htmlFor="stock" className="form__label">Stock</label>
                <input
                    id="stock"
                    name="stock"
                    type="number"
                    min={0}
                    onChange={e => setStock(parseInt(e.target.value))} />
                <label htmlFor="isAlternative" className="form__label">Es alternativa?</label>
                <div className="check__form__container">
                    <input
                        id="isAlternative"
                        name="isAlternative"
                        type="checkbox"
                        onChange={e => setIsAlternative(e.target.checked)} />
                </div>
                <label htmlFor="isTeam" className="form__label">Es un de un equipo? No marcar si pertenece a una selección</label>
                <div className="check__form__container">
                    <input
                        id="isTeam"
                        name="isTeam"
                        type="checkbox"
                        onChange={e => setIsTeam(e.target.checked)} />
                </div>
                <button type="submit" className="button button--main">Guardar</button>
            </form>
        </div>
    )
}

export default NewProductForm