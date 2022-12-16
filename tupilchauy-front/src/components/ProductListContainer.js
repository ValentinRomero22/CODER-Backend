import { useEffect, useState } from "react"
import ProductList from "./ProductList"

const ProductListContainer = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [listProductsUpdated, setListProductsUpdated] = useState(false)

    useEffect(() => {
        setLoading(true)

        const requestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch("http://localhost:8080/product/", requestInit)
            .then(response => response.json())
            .then(result => setProducts(result.data))
            .catch(error => setError(true))

        setLoading(false)
    }, [listProductsUpdated])

    if (error) {
        return (
            <div>
                <h2>Se produjo un error inesperado</h2>
            </div>
        )
    }

    return (
        !loading &&
            products.length > 0
            ? <ProductList products={products} setListProductsUpdated={setListProductsUpdated} />
            : <p>No hay productos</p>

    )
}

export default ProductListContainer