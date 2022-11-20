import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductListContainer from './components/ProductListContainer';

function App() {
    return (
        <ProductListContainer/>
        /* <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<ProductListContainer />} />
            </Routes>
        </BrowserRouter> */
    )
}

export default App;