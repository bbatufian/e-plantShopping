import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Extract numeric value from cost string (e.g., "$15" -> 15)
      const price = parseFloat(item.cost.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2); // Keep 2 decimal places
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    // Call the parent function to continue shopping
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    alert('Functionality to be added for future reference');
    setCheckoutMessage('Thank you for your purchase! Checkout functionality coming soon.');
  };

  const handleIncrement = (item) => {
    // Increase quantity by 1
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ 
      name: item.name, 
      amount: newQuantity 
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrease quantity by 1 if quantity > 1
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ 
        name: item.name, 
        amount: newQuantity 
      }));
    } else {
      // If quantity would become 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // Remove item from cart
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Extract numeric value from cost string
    const price = parseFloat(item.cost.replace('$', ''));
    // Calculate total cost for this item
    const total = price * item.quantity;
    return total.toFixed(2);
  };

  // Calculate total number of items in cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button 
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-summary">
            <div className="cart-stats">
              <span className="total-items">Total Items: {calculateTotalItems()}</span>
              <h3 className="total-amount">Total Amount: ${calculateTotalAmount()}</h3>
            </div>
          </div>
          
          <div className="cart-items-list">
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <div className="cart-item-image-container">
                  <img 
                    className="cart-item-image" 
                    src={item.image} 
                    alt={item.name} 
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <button 
                      className="cart-item-delete" 
                      onClick={() => handleRemove(item)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      × Remove
                    </button>
                  </div>
                  <p className="cart-item-description">{item.description}</p>
                  <div className="cart-item-price-info">
                    <span className="cart-item-unit-price">Unit Price: {item.cost}</span>
                    <span className="cart-item-subtotal">Subtotal: ${calculateTotalCost(item)}</span>
                  </div>
                  <div className="cart-item-controls">
                    <div className="cart-item-quantity">
                      <button 
                        className="cart-item-button cart-item-button-dec" 
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="cart-item-quantity-value">{item.quantity}</span>
                      <button 
                        className="cart-item-button cart-item-button-inc" 
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      Total: ${calculateTotalCost(item)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-footer">
            <div className="cart-total-summary">
              <div className="cart-total-row">
                <span>Subtotal:</span>
                <span>${calculateTotalAmount()}</span>
              </div>
              <div className="cart-total-row">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <div className="cart-total-row grand-total">
                <span>Grand Total:</span>
                <span>${calculateTotalAmount()}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <button 
                className="continue-shopping-btn" 
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button 
                className="checkout-btn" 
                onClick={handleCheckoutShopping}
              >
                Proceed to Checkout
              </button>
            </div>
            
            {checkoutMessage && (
              <div className="checkout-message">
                {checkoutMessage}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;


