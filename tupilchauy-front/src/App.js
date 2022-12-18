import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductListContainer from './components/ProductListContainer'
import NewProductForm from './components/NewProductForm'
import EditProductForm from './components/EditProductForm'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProductListContainer />} />
          <Route path='/newProduct' element={<NewProductForm />} />
          <Route path='/editProduct/:id' element={<EditProductForm />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
