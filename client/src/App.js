import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from "react";
import { UserProvider } from './context/UserContext';
import Navbar from "./components/Navbar";
import ProductListContainer from "./components/ProductListContainer";
import CartContainer from './components/CartContainer';

function App() {
    return (       
        <Fragment>
            <UserProvider>
                <BrowserRouter> 
                    <Navbar />
                    <Routes>
                        <Route path='/' element={ <ProductListContainer /> }/>
                        <Route path='/cart/' element={ <CartContainer /> }/>
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </Fragment> 
    )
}

export default App;
