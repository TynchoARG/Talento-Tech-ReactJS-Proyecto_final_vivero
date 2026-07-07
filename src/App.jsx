import './App.css';
import Layout from './assets/componentes/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductosPage from './Pages/ProductosPage';
import CarritoPage from './Pages/CarritoPage';
import ProductoDetalle from './Pages/ProductoDetalle';
import NosotrosPage from './Pages/NosotrosPage';

function App() {
 return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path='/' element={<Home />} />
            <Route path='/productos' element={<ProductosPage/>} />
            <Route path='/carrito' element={<CarritoPage Mensaje='Productos del carrito' />} />
            <Route path='/producto/:id' element={<ProductoDetalle/>} />
            <Route path='/nosotros' element={<NosotrosPage/>} />
        </Route>
    </Routes>
 );
}
export default App;
