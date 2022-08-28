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
                { 
                    user === true ? 
                        <Link to='/'><h1>ADMIN</h1></Link> : 
                        <Link to='/'><h1>USER</h1></Link> 
                }
                {/* <div>
                    <Link to='/'><h1>TU PILCHA UY</h1></Link>
                </div> */}
            </nav>
        </header>
    )
}

export default Navbar