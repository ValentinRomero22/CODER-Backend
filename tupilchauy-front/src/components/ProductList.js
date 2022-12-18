import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductList = ({ product, products, setProduct, setListProductsUpdated, cartId }) => {
    const [error, setError] = useState(false)

    const deleteProduct = (id) => {
        const requestInit = { method: 'DELETE' }

        try {
            fetch('http://localhost:8080/api/productos/' + id, requestInit)
                .then(res => {
                    return res
                }).catch(error => {
                    setError(true)
                })
        } catch (error) {
            setError(true)
        }

        setListProductsUpdated(true)
    }

    if (error) {
        return (
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return (
        <div className="catalog">
            {
                products.map(p => (
                    <div key={p._id} className="product">
                        <img src={p.image} alt={p.name} />
                        <div className="product__name__container">
                            <p>{p.name}</p>
                        </div>
                        <div className="product__price__container">
                            <p>$ {p.price}</p>
                        </div>
                        <Link to={`/editProduct/${p._id}`} className="button button--edit">
                            Editar
                        </Link>
                        <button className="button button--delete" onClick={() => deleteProduct(p.id)}>
                            Eliminar
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductList