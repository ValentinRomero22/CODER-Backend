import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import './App.css';
import ProductListContainer from './components/ProductListContainer';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProductListContainer />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
