import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav>
                <Link to='/'><h1>TU PILCHA UY</h1></Link>
                {/* <div className="nav__options__container">
                    {
                        user === true ?
                            <p>Bienvenido administrador</p> :
                            <p>Bienvenido usuario</p>
                    }
                    <Link to='/cart/'>Ver carrito</Link>
                </div> */}
            </nav>
        </header>
    )
}

export default Header