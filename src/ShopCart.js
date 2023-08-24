import React from 'react';
function ShopCart({ cartItems, setCartItems }) {
    // ...
    const handleIncrementQuantity = (itemId) => {
        // Find the item in the cart and increment its quantity
        const updatedCart = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const handleDecrementQuantity = (itemId) => {
        // Find the item in the cart and decrement its quantity
        const updatedCart = cartItems.map(item =>
            item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (itemId) => {
        // Remove the item from the cart
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        localStorage.removeItem('cart');
        setCartItems(updatedCart);
    };;

    const handleEditQuantity = (itemId, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


      // Calculate total price
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.title} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                        {item.title} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                        <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
                        <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </li>
                ))}
            {cartItems.map(item => (
    <li key={item.id}>
        {item.title} - Quantity:
        <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleEditQuantity(item.id, parseInt(e.target.value))}
        />
        - Price: ${item.price * item.quantity}
        <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
        <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
    </li>
))}

            </ul>
            <p>Total Price: ${totalPrice}</p>
        </div>
            );
        }
        export default ShopCart; 
        