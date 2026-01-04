import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <div className="image-placeholder-square">
          {/* Black and White Cart Item Placeholder */}
          <div className="bw-cart-placeholder">
            <div className="cart-pattern"></div>
            <span className="cart-item-id">{item.id}</span>
          </div>
        </div>
      </div>
      
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h3 className="cart-item-title">{item.title}</h3>
          <p className="cart-item-price">${item.price.toLocaleString()}.00</p>
        </div>
        
        <div className="cart-item-actions">
          <div className="qty-selector-mini">
            <button 
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              style={{ opacity: item.quantity <= 1 ? 0.5 : 1 }}
            >
              —
            </button>
            <span>{item.quantity.toString().padStart(2, '0')}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <button className="remove-link" onClick={handleRemove}>
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
