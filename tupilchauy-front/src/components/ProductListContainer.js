import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductList from "./ProductList"

const ProductListContainer = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setLoading(true)

        fetch('http://localhost:8080/product')
            .then(response => response.json())
            .then(response => setProducts(response.data))
            .catch(error => setError(true))

        setLoading(false)
    }, [])

    if (error) {
        return (
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return (
        !loading &&
            products.length > 0
            ? <div className="main__container">
                <div className="catalog__container">
                    <div className="catalog__header">
                        <h2>Productos</h2>
                        <Link className="button button--new" to={'/newProduct'}>
                            Agregar producto
                        </Link>
                    </div>
                    <ProductList products={products} />
                </div>
            </div >
            : <div className="main__container">
                <h2 className="products__message">No hay productos!</h2>
            </div>
    )
}

export default ProductListContainer