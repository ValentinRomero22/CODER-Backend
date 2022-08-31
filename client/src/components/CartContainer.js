import { useEffect, useState, useContext } from "react"
import Cart from "./Cart"

const CartContainer = () =>{
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cartProducts, setCartProducts] = useState([])
    const [cartProductsUpdated, setCartProductsUpdated] = useState(false)
    const [deletedCart, setDeletedCart] = useState(false)

    const cartId = parseInt(localStorage.getItem('cartId'))
    
    useEffect(() =>{
        setLoading(true)

        try{
            const data = () =>{
                fetch('http://localhost:8080/api/carrito/' + cartId + '/productos')
                .then(res => res.json())
                .then(res => setCartProducts(res))
                .catch(error => setError(error))
            }
            
            data()
        } catch(error){
            setError(true)
        } finally{
            setLoading(false)
        }

        setCartProductsUpdated(false)
    }, [cartProductsUpdated])

    const deleteCart = (cartId) =>{
        const requestInit = { method: 'DELETE' }

        try{
            fetch('http://localhost:8080/api/carrito/' + cartId, requestInit)
            .then(res =>{ 
                return res
            }).catch(error =>{
                setError(true)
            })            
        } catch(error){
            setError(true)
        }

        localStorage.removeItem('cartId')
        setDeletedCart(true)
    }

    if (error){ 
        return(
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return(
        !loading &&
        deletedCart ?
        <div className="main__container">
            <h2 className="products__message">Su carrito de compras fue eliminado</h2>
        </div> :
            cartProducts && cartProducts.length > 0 ?
                <div className="main__container main__cart__container">
                    <div className="catalog__container cart__container">
                        <div className='catalog__header cart__header'>
                            <h2 className="products__message">Carrito de compras</h2>
                            <button className="button button--delete" onClick={() => deleteCart(cartId)}>
                                Eliminar carrito
                            </button>
                        </div>
                        <Cart
                            cartProducts={cartProducts}
                            setCartProductsUpdated={setCartProductsUpdated}
                            cartId={cartId} />
                    </div>              
                </div> :
                <div className="main__container">
                    <h2 className="products__message">Su carrito de compras está vacío!</h2>
                </div>
    )
}

export default CartContainer