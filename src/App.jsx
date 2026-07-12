import "./App.css";
import Layout from "./assets/componentes/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductosPage from "./Pages/ProductosPage";
import CarritoPage from "./Pages/CarritoPage";
import ProductoDetalle from "./Pages/ProductoDetalle";
import NosotrosPage from "./Pages/NosotrosPage";
import Cart from "./assets/componentes/Cart/Cart";
import ProductosFS from "./Pages/ProductosFS";
import GestionProductos from "./assets/componentes/Gestion/Gestion";
import Login from "./assets/componentes/Login/Login";
import Registro from "./assets/componentes/Registro/Registro";
import ProtectedRoute from "./assets/componentes/ProtectedRoute/ProtectedRoute";
import GestionCupones from "./assets/componentes/GestionCupones/GestionCupones";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route 
          path="/cupones" 
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionCupones />
            </ProtectedRoute>  
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/gestion"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionProductos />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
