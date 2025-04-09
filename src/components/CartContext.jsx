import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const SUPER_USER_EMAILS = ['youssefkallel.sascode@gmail.com', 'ranimarfa8@gmail.com', 'dhaferkallel4@gmail.com'];
const SUPER_USER_PASSWORD = "artemisstore987654321";

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);


  const login = (email, password) => {
    if (SUPER_USER_EMAILS.includes(email) && password === SUPER_USER_PASSWORD) {
      const superUser = {
        email,
        isSuperUser: true
      };
      setUser(superUser);
      localStorage.setItem('artemis_user', JSON.stringify(superUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('artemis_user');
  };
  
  useEffect(() => {
    const savedUser = localStorage.getItem('artemis_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("userCart");
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setCartItems(cart);
      setCartCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
    }
  }, []);


  const updateCart = (newCart) => {
    localStorage.setItem("userCart", JSON.stringify(newCart));
    setCartItems(newCart);
    setCartCount(newCart.reduce((total, item) => total + (item.quantity || 1), 0));
  };

  const addToCart = (product) => {
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    let newCart;
    
    if (existingIndex >= 0) {
      newCart = [...cartItems];
      newCart[existingIndex].quantity = (newCart[existingIndex].quantity || 1) + 1;
    } else {
      newCart = [...cartItems, { ...product, quantity: 1 }];
    }
    
    updateCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cartItems.filter(item => item.id !== productId);
    updateCart(newCart);
  };


  const decreaseQuantity = (productId) => {
    const existingIndex = cartItems.findIndex(item => item.id === productId);
    if (existingIndex >= 0) {
      const newCart = [...cartItems];
      if (newCart[existingIndex].quantity > 1) {
        newCart[existingIndex].quantity -= 1;
      } else {
        newCart.splice(existingIndex, 1);
      }
      updateCart(newCart);
    }
  };

  const clearCart = () => {
    localStorage.removeItem("userCart");
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
      updateCart,
      user,
      login,
      logout  
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};