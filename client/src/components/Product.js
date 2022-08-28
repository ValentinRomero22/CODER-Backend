const Product = ({ id, timestamp, name, description, code, image, price, stock, user }) =>{
    /* const handleEliminar = () =>{

    } */

    return(
        <div className="product">
            <img src={image} alt={name}/>
            <div className="product__name__container">
                <p>{name}</p>
            </div>
            <div className="product__price__container">
                <p>$ {price}</p>
            </div>
            <button className="button--detail">Ver detalle</button>
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
                    <button className="button--edit" /* onClick={handleEliminar} */>Editar</button>
                    <button className="button--delete" /* onClick={handleEliminar} */>Eliminar</button>
                </div>
            }
        </div>
    )
}

export default Product