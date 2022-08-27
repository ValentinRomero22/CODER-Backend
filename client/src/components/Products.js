import { useEffect, useState } from "react"
import Product from "./Product"

const Products = () =>{
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
            <p>Productos...</p>
           {products.map(p => <Product key = {p.id} {...p} />)}
        </>
    )
}

export default Products