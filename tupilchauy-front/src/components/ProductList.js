import { useState } from 'react'

const ProductList = ({ products, setListProductsUpdated }) => {
    const [error, setError] = useState(false)

    const deleteProduct = (productId) => {
        const requestInit = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch("http://localhost:8080/product/" + productId, requestInit)
            .then(result => { return result })
            .catch(error => setError(true))

        setListProductsUpdated(true)
    }

    return (
        <div>
            {
                products.map(p => (
                    <div key={p._id}>
                        <img src={p.image} alt={p.name} />
                        <p>{p.name}</p>
                        <p>{p.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductList