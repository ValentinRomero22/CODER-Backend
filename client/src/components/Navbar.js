import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserProvider from '../context/UserContext'

const Navbar = () => {
    const { getUserType } = useContext(UserProvider)

    const user = getUserType()

    return (
        <header>
            <nav>
                <Link to='/'><h1>TU PILCHA UY</h1></Link>
                <div className="nav__options__container">
                    {
                        user === true ?
                            <p>Bienvenido administrador</p> :
                            <p>Bienvenido usuario</p>
                    }
                    <Link to='/cart/'>Ver carrito</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar