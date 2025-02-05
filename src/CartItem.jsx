import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, updateCartQuantity }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * parseFloat(item.cost.replace('$', '')), 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    updateCartQuantity();
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
    updateCartQuantity();
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    updateCartQuantity();
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    updateCartQuantity();
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-title">Paradise Nursery</h1>
          <div className="navbar-links">
            <a href="#" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</a>
            <div className="cart-icon">
              🛒 <span className="cart-quantity">{calculateTotalQuantity()}</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="cart-container">
        <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
        <h3 style={{ color: 'black' }}>Total Items in Cart: {calculateTotalQuantity()}</h3>
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
          <br />
          <button className="get-started-button1">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;




