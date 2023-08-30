import React, { useState } from 'react';
import './style.css'; // Import your CSS file

function CheckoutPage({ cartItems, setCartItems }) {
    const shippingCostPerItem = 16.99;
    
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + (cartItems.length * shippingCostPerItem);
    
    const estimatedShippingDate = new Date();
    estimatedShippingDate.setDate(estimatedShippingDate.getDate() + 10); // Add 10 days

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCheckout = () => {
        if (name && address) {
            setConfirmationMessage('Thank you for your business! Your items are being prepared for shipping.');
            setErrorMessage('');
            setCartItems([]); // Clear the cart items
        } else {
            setErrorMessage('Please confirm that the name and shipping address are correct.');
            setConfirmationMessage('');
        }
    };
    

    return (
        <div>
            <h2>Checkout</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.title} - Quantity: {item.quantity} - Price: ${item.price * item.quantity.toFixed(2)}
                    </li>
                ))}
            </ul>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="address">Shipping Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="estimatedShippingDate">Estimated Shipping Date:</label>
                <input
                    type="date"
                    id="estimatedShippingDate"
                    value={estimatedShippingDate.toISOString().split('T')[0]}
                    readOnly
                />
            </div>
            <button onClick={handleCheckout}>Confirm Purchase</button>
            {confirmationMessage && <p>{confirmationMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default CheckoutPage;
