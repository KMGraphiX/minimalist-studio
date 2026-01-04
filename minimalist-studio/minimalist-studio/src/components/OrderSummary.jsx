import React from 'react';

const OrderSummary = () => {
  const summaryData = {
    subtotal: 3196.00,
    shipping: 0.00,
    tax: 255.68,
    total: 3451.68
  };

  return (
    <div className="order-summary-container">
      <div className="order-summary-border-box">
        <h3 className="summary-title">ORDER REVIEW</h3>
        
        <div className="summary-details">
          <div className="detail-row">
            <span>SUBTOTAL</span>
            <span>${summaryData.subtotal.toLocaleString()}.00</span>
          </div>
          <div className="detail-row">
            <span>SHIPPING</span>
            <span>FREE</span>
          </div>
          <div className="detail-row">
            <span>TAX</span>
            <span>${summaryData.tax.toLocaleString()}</span>
          </div>
          <div className="detail-total-row">
            <span>TOTAL</span>
            <span>${summaryData.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="payment-notice">
          <p className="notice-label">PAYMENT METHOD</p>
          <p className="notice-text">PAYMENT METHOD WILL BE SELECTED IN THE NEXT STEP</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
