import { useEffect, useState } from "react"
import ProductList from "./ProductList"

const ProductListContainer = () =>{
    const [products, setProducts] = useState([])

    useEffect(() =>{
        const getProducts = () =>{
            fetch('http://localhost:8080/api/products')
            .then(res => res.json())
            .then(res => setProducts(res))
        }

        getProducts()
    }, [])

    return(
        <>
            <div>
                { 
                    products.length > 0 ?
                        <ProductList products = {products} title = 'PRODUCTOS' /> :
                        <h2 className="products__message">No hay productos!</h2>
                }
            </div>
        </>
    )
}

export default ProductListContainer