import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ShopCart from './ShopCart';
import Checkout from './Checkout'; // Import the Checkout component

function App() {
    // State to manage the cart items
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

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

    // Update local storage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div>
            <ProductList addToCart={addToCart} />
            <ShopCart
                cartItems={cartItems}
                setCartItems={setCartItems}
                addToCart={addToCart}
            />
            {showCheckout ? (
                <div>
                    <Checkout
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        addToCart={addToCart}
                    />
                    <button onClick={() => setShowCheckout(false)}>Back to Cart</button>
                </div>
            ) : (
                <button onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
            )}
        </div>
    );
}

export default App;

