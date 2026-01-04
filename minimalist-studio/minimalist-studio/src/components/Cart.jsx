import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, calculateSubtotal } = useCart();

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <section className="cart-section">
      <div className="section-header-simple">
        <h2 className="section-title">YOUR CART</h2>
        <span className="cart-count">({cartItems.length} ITEMS)</span>
      </div>

      <div className="cart-container">
        {/* LEFT COLUMN: ITEMS */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
          <Link to="/" className="continue-shopping-btn">
            ← CONTINUE SHOPPING
          </Link>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="cart-summary-wrapper">
          <div className="cart-summary-box">
            <h3 className="summary-title">ORDER SUMMARY</h3>
            
            <div className="summary-row">
              <span>SUBTOTAL</span>
              <span>${subtotal.toLocaleString()}.00</span>
            </div>
            <div className="summary-row">
              <span>SHIPPING</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>TAX</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-total">
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn-outline">
              PROCEED TO CHECKOUT
            </Link>
            <p className="summary-note">SHIPPING AND TAXES CALCULATED AT CHECKOUT</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
