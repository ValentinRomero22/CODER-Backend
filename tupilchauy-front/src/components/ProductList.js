import { Link } from 'react-router-dom'
import useNotification from "../hooks/useNotification"

const ProductList = ({ products, setListProductsUpdated }) => {
    const showNotification = useNotification()

    const deleteProduct = (id) => {
        const requestInit = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch('http://localhost:8080/product/' + id, requestInit)
            .then(res => res.json())
            .then(res => {
                showNotification(res.message, 'ok')
            })
            .catch(res => {
                showNotification(res.message, 'ok')
            })

        setListProductsUpdated(true)
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
                        <button className="button button--delete" onClick={() => deleteProduct(p._id)}>
                            Eliminar
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductList