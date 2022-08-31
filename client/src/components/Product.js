import { useState } from "react"
import { deleteProduct } from "../services/backConsumer"
import { useAsync } from "../hooks/useAsync"

const Product = ({ id, timestamp, name, description, code, image, price, stock, user }) =>{
    const [del, setDel] = useState(false)

    const { data, error } = useAsync(() => deleteProduct(id), [del])
    console.log(data)

    const deleteProductFromList = (e) =>{
        e.preventDefault()
        setDel(true)
    }

    return(
        <div className="product">
            <img src={image} alt={name}/>
            <div className="product__name__container">
                <p>{name}</p>
            </div>
            <div className="product__price__container">
                <p>$ {price}</p>
            </div>
            <button className="button button--detail">Ver detalle</button>
            {/* <p>ID: {id}</p>
            <p>TIMESTAMP {timestamp}</p>
            <p>NAME {name}</p>
            <p>DESCRIPTION {description}</p>
            <p>CODE {code}</p>
            <p>IMAGE {image}</p>
            <p>PRICE {price}</p>
            <p>STOCK {stock}</p> */}
            { user && 
                <div className="admin__controls__container">
                    <input 
                        className="button button--edit"
                        defaultValue={"Editar"}/>
                    <input 
                        className="button button--delete"
                        defaultValue={"Eliminar"}
                        onClick={ e => deleteProductFromList(e) }/>
                </div>
            }
        </div>
    )
}

export default Product