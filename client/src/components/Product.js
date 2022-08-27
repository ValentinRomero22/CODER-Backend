const Product = ({ id, timestamp, name, description, code, image, price, stock }) =>{
    return(
        <div>
            <p>ID: {id}</p>
            <p>TIMESTAMP {timestamp}</p>
            <p>NAME {name}</p>
            <p>DESCRIPTION {description}</p>
            <p>CODE {code}</p>
            <p>IMAGE {image}</p>
            <p>PRICE {price}</p>
            <p>STOCK {stock}</p>
        </div>
    )
}

export default Product