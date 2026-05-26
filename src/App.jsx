import './App.css';
import Layout from './assets/componentes/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductosPage from './Pages/ProductosPage';
import CarritoPage from './Pages/CarritoPage';

function App() {
 return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path='/' element={<Home />} />
            <Route path='/productos' element={<ProductosPage/>} />
            <Route path='/carrito' element={<CarritoPage Mensaje='Productos del carrito' />} />
        </Route>
    </Routes>
 );
}
export default App;
