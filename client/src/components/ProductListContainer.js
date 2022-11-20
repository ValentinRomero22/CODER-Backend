import { useEffect, useState, useContext } from "react"

const ProductListContainer = () => {
    const [products, setProducts] = useState([])
    const [id, setId] = useState(0)

    useEffect(() => {
        try {
            const data = () => {
                fetch('/api')
                    .then(res => res.json())
                    .then(res => setProducts(res.data))
                    .catch(error => console.log(error))
            }

            data()
        } catch (error) {
            console.log(error)
            //setError(true)
        } /* finally {
            setLoading(false)
        } */
    }, [id])

    return (
        products.length
            ? (
                <div>
                    <h1>PRODUCTOS</h1>
                    <ul>
                        {
                            products.map(p =>(
                                <li key={p._id}>{p.name}</li>
                            ))
                        }
                    </ul>
                </div>
            )
            : (
                <p>NO HAY PRODUCTOS</p>
            )
    )
}

export default ProductListContainer