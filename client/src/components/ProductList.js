import { useContext } from 'react'
import UserProvider from '../context/UserContext'
import Product from "./Product";

const ProductList = ({ products, title }) =>{
    const { getUserType } = useContext(UserProvider)
    const user = getUserType()

    return(
        <div className='catalog__container'>
            <div className='catalog__header'>
                <h2>{title}</h2>
                <div className='form__header__container'>
                    <form>
                        <input type = {'number'} placeholder = {'N° de Id'}></input>
                        <button className="button--detail">Buscar</button>
                    </form>
                </div>
            </div>
            <div className="catalog">
                { products.map(p => <Product key = {p.id} {...p} user = {user} />) }
            </div>
        </div>
    )
}

export default ProductList