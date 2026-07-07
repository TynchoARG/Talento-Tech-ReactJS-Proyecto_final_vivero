import { useState, useContext, createContext } from "react";

export const CartContext = createContext();

//Creamos un Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    //Este es un mensaje de error para el desarrollador
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

//Creamos el CartProvider (el cerebro de todo)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); //El carrito arranca vacío.

  //Creamos las funciones que manejan el carrito

  //Agregar al Carrito
  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  //Vaciar el carrito
  const cleanCart = () => {
    setCart([]);
  };

  //Cantidad en el carrito
  //Recorre el carrito y suma las cantidades. Muestra el número de productos en un icono
  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  //Precio total del carrito
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, cleanCart, getCartQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};