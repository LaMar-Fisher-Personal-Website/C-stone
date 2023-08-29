import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import your CSS file

function CartPage({ cartItems, setCartItems }) {
    const [zipCode, setZipCode] = useState('');

    const handleEmptyCart = () => {
        setCartItems([]); // Empty the cart
    };

    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    };

    const calculateTotalPrice = () => {
        const shippingCost = zipCode ? 26.99 : 0;
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + shippingCost;
    };

    const shippingCostPerItem = 16.99;

    const totalShippingCost = cartItems.length * shippingCostPerItem;

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price * item.quantity}</p>
                        <img src={item.image} alt={item.title} style={{ maxWidth: '100px' }} />
                    </li>
                ))}
            </ul>
            <div>
                <label htmlFor="zipCode">Enter your zip code for estimated shipping:</label>
                <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                />
            </div>
            {zipCode && (
                <div>
                    Shipping Cost: ${totalShippingCost.toFixed(2)}
                </div>
            )}
            <div>
                Subtotal: ${calculateTotalPrice().toFixed(2)}
            </div>
            <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
            <button onClick={handleEmptyCart}>Empty Cart</button>
            <Link to="/checkout">Proceed to Checkout</Link>
        </div>
    );
}

export default CartPage;
