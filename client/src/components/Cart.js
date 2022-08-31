import { useState, useContext } from "react"

const Cart = ({ cartProducts, setCartProductsUpdated, cartId }) =>{
    const [error, setError] = useState(false)
    
    const deleteProductOnCart = (productId, cartId) =>{
        const requestInit = { method: 'DELETE' }

        try{
            fetch('http://localhost:8080/api/carrito/' + cartId + '/productos/' + productId, requestInit)
            .then(res =>{ 
                return res
            }).catch(error =>{
                setError(true)
            })            
        } catch(error){
            setError(true)
        }

        setCartProductsUpdated(true)
    }

    if (error){ 
        return(
            <div className="main__container">
                <h2 className="products__message">Se produjo un error inesperado</h2>
            </div>
        )
    }

    return (
        <div className="catalog cartList">
            {
                cartProducts.map(p => (
                    <div key={p.id} className="product">
                        <img src={p.image} alt={p.name} />
                        <div className="product__name__container">
                            <p>{p.name}</p>
                        </div>
                        <div className="product__price__container">
                            <p>$ {p.price}</p>
                        </div>
                        <button className="button button--delete" onClick={() => deleteProductOnCart(p.id, cartId)}>
                            Eliminar del carrito
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default Cart