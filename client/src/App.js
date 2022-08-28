import { BrowserRouter } from 'react-router-dom'
import { Fragment } from "react";
import { UserProvider } from './context/UserContext';
import Navbar from "./components/Navbar";
import ProductListContainer from "./components/ProductListContainer";

function App() {
    return (       
        <Fragment>
            <UserProvider>
                <BrowserRouter> 
                    <Navbar />
                    <ProductListContainer />
                </BrowserRouter>
            </UserProvider>
        </Fragment> 
    )
}

export default App;
