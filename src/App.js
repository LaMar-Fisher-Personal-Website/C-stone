import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ShopCart from './ShopCart';
import Login from './Login'; // Create a Login component
import Checkout from './Checkout'; // Import the Checkout component

function App() {
    // State to manage the cart items
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []); 
    
    // Empty dependency array ensures this effect runs only once when the component mounts

    // Function to add an item to the cart
    const addToCart = (product) => {
        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            // If the product is already in the cart, update its quantity
            const updatedCart = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            // If the product is not in the cart, add it with quantity 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const handleLogin = (fakeToken) => {
        // Here you would perform a login request to the API using the fake token
        // If the login is successful, set the user state
        setUser(fakeToken); // For demonstration purposes, setting user directly
    };

    const handleLogout = () => {
        // Clear user state and cart data
        setUser(null);
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    // Update local storage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
      <div>
          {!user ? (
              <Login onLogin={handleLogin} />
          ) : (
              <div>
                  <h1>Welcome, Fullstack Academy Future Grads!</h1>
                  <ProductList addToCart={addToCart} />
                  <ShopCart
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                  />
                  {showCheckout ? (
                      <div>
                          <Checkout
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                          />
                          <button onClick={() => setShowCheckout(false)}>Back to Cart</button>
                      </div>
                  ) : (
                      <button onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
                  )}
                  <button onClick={handleLogout}>Logout</button>
              </div>
          )}
      </div>
  );
}

export default App;





