import { useEffect, useState, useContext } from "react"
import ProductList from "./ProductList"
import ProductForm from "./ProductForm"
import UserProvider from '../context/UserContext'

const ProductListContainer = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [listProductsUpdated, setListProductsUpdated] = useState(false)
    const [id, setId] = useState(0)
    const [idInput, setIdInput] = useState(0)

    const { getUserType } = useContext(UserProvider)
    const user = getUserType()

    const getProduct = (e) =>{
        e.preventDefault()
        setId(idInput)
    }
    
    const [product, setProduct] = useState({
        name: "",
        description: "",
        code: "",
        image: "",
        price: 0,
        stock: 0
    })

    useEffect(() =>{
        if(localStorage.getItem('cartId') == null){
            const requestInit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }

            try{               
                fetch('http://localhost:8080/api/carrito/', requestInit)
                    .then(res => res.json())
                    .then(res => localStorage.setItem('cartId', res))
                    .catch (error => setError(true))                
            } catch(error){
                setError(true)
            }
        }
    }, [localStorage.getItem('cartId')])

    useEffect(() =>{
        setLoading(true)

        if (id == 0) {            
            try{
                const data = () =>{
                    fetch('http://localhost:8080/api/productos')
                        .then(res => res.json())
                        .then(res => setProducts(res))
                        .catch(error => setError(error))
                }

                data()
            } catch (error){
                setError(true)
            } finally{
                setLoading(false)
            }
        } else{
            try{
                const data = () => {
                    fetch('http://localhost:8080/api/productos/' + id)
                        .then(res => res.json())
                        .then(res => {
                            if(res.error){
                                setProducts(res.error)
                            } else{
                                setProducts([res])
                            }
                        })
                        .catch(error => setError(error))
                }

                data()
            } catch (error){
                setError(true)
            } finally{
                setLoading(false)
            }
        }
    }, [id])


    useEffect(() => {
        setLoading(true)

        if (id == 0) {
            try{
                const data = () =>{
                    fetch('http://localhost:8080/api/productos')
                        .then(res => res.json())
                        .then(res => setProducts(res))
                        .catch(error => setError(error))
                }

                data()
            } catch (error){
                setError(true)
            } finally{
                setLoading(false)
            }
        } else{
            try{
                const data = () => {
                    fetch('http://localhost:8080/api/productos/' + id)
                        .then(res => res.json())
                        .then(res => setProducts(res))
                        .catch(error => setError(error))
                }

                data()
            } catch (error){
                setError(true)
            } finally{
                setLoading(false)
            }
        }
        
        setListProductsUpdated(false)
    }, [listProductsUpdated])

    if (error){ 
        return(
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return (
        !loading &&
            products.length > 0 ?
            products.includes('No se encontró') ?
                <div className="main__container">
                    <h2 className="products__message">No se encontró un producto con id {id}. Recargar la página!</h2>
                </div> :
                <div className="main__container">
                    <div className="catalog__container">
                        <div className='catalog__header'>
                            <h2 className="products__message">Productos</h2>
                            <form
                                onSubmit={e => {
                                    e.preventDefault()
                                    getProduct(e)
                                }}>
                                <input
                                    type="number"
                                    min={0}
                                    defaultValue={id}
                                    onChange={e => setIdInput(e.target.value)} />
                                <input
                                    type="submit"
                                    className="button button--detail"
                                    value="Buscar" />
                            </form>
                        </div>
                        <ProductList
                            product={product}
                            products={products}
                            setProduct={setProduct}
                            setListProductsUpdated={setListProductsUpdated}
                            cartId={localStorage.getItem('cartId')} />
                    </div> 
                    {
                        user &&
                        <div className="product__form__container">
                            <h2 className="products__message">Formulario de productos</h2>
                            <ProductForm product={product} setProduct={setProduct}/>
                        </div>
                    }             
                </div> :
            <div className="main__container">
                <h2 className="products__message">No hay productos!</h2>
            </div>
    )
}

export default ProductListContainer