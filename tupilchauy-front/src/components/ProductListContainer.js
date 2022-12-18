import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductList from "./ProductList"
import useNotification from "../hooks/useNotification"

const ProductListContainer = () => {
    const showNotification = useNotification()

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [listProductsUpdated, setListProductsUpdated] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8080/product')
            .then(res => res.json())
            .then(res => setProducts(res.data))
            .catch(res => {
                showNotification(res.message, 'error')
            })

        setLoading(false)
    }, [])

    useEffect(() => {
        fetch('http://localhost:8080/product')
            .then(res => res.json())
            .then(res => setProducts(res.data))
            .catch(res => {
                showNotification(res.message, 'error')
            })

        setLoading(false)
        setListProductsUpdated(false)
    }, [listProductsUpdated])

    return (
        !loading &&
            products.length > 0
            ? <div className="main__container">
                <div className="catalog__container">
                    <div className="catalog__header">
                        <h2>Productos</h2>
                        <Link className="button button--main" to={'/newProduct'}>
                            Agregar producto
                        </Link>
                    </div>
                    <ProductList products={products} setListProductsUpdated={setListProductsUpdated} />
                </div>
            </div >
            : <div className="main__container">
                <h2 className="products__message">No hay productos!</h2>
            </div>
    )
}

export default ProductListContainer