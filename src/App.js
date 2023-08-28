import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ShopCart from './ShopCart';
import Login from './Login';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            const updatedCart = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const handleLogin = (fakeToken) => {
        setUser(fakeToken);
    };

    const handleLogout = () => {
        setUser(null);
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                        <li>
                            <Link to="/checkout">Checkout</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
                    <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />
                    <Route path="/" element={!user ? <Login onLogin={handleLogin} /> : (
                        <div>
                            <h1>Welcome, FullStack Future Grads!</h1>
                            <ProductList addToCart={addToCart} />
                            <ShopCart cartItems={cartItems} setCartItems={setCartItems} />
                            {showCheckout ? (
                                <div>
                                    {/* Rest of the code for Checkout */}
                                </div>
                            ) : (
                                <button onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
                            )}
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;







