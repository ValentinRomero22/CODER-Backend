import { useState, useContext } from 'react'
import UserProvider from '../context/UserContext'

const ProductList = ({ product, products, setProduct, setListProductsUpdated, cartId }) => {
    const { getUserType } = useContext(UserProvider)
    const user = getUserType()

    const [error, setError] = useState(false)

    const deleteProduct = (id) => {
        const requestInit = { method: 'DELETE' }

        try{
            fetch('http://localhost:8080/api/productos/' + id, requestInit)
            .then(res => {
                return res
            }).catch(error => {
                setError(true)
            })
        } catch(error){
            setError(true)
        }

        setListProductsUpdated(true)
    }

    const { id, timestamp, name, description, code, image, price, stock } = product

    const updateProduct = (id) => {
        if(product.name === '' || product.description === '' || product.code === '' || product.image === '' ||
            isNaN(product.price) || isNaN(product.stock)){
            alert('Por favor, ingrese la información requierda correctamente')
            return
        }

        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }

        try {
            fetch('http://localhost:8080/api/productos/' + id, requestInit)
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

        setListProductsUpdated(true)
    }

    const addProductOnCart = (product) =>{
        const requestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }

        try{               
            fetch('http://localhost:8080/api/carrito/' + cartId + '/productos', requestInit)
                .then(res => res.json())
                .catch (error => setError(true))                
        } catch(error){
            setError(true)
        }
    }

    if (error){ 
        return(
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return (
        <div className="catalog">
            {
                products.map(p => (
                    <div key={p.id} className="product">
                        <img src={p.image} alt={p.name} />
                        <div className="product__name__container">
                            <p>{p.name}</p>
                        </div>
                        <div className="product__price__container">
                            <p>$ {p.price}</p>
                        </div>
                        <button className="button button--detail" onClick={() => addProductOnCart(p)}>Agregar al carrito</button>
                        {user &&
                            <div className="admin__controls__container">
                                <button className="button button--edit" onClick={() => updateProduct(p.id)}>
                                    Editar
                                </button>
                                <button className="button button--delete" onClick={() => deleteProduct(p.id)}>
                                    Eliminar
                                </button>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default ProductList