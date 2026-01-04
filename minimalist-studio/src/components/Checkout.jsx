import React from 'react';
import AddressForm from './AddressForm';
import OrderSummary from './OrderSummary';

const Checkout = () => {
  return (
    <section className="checkout-section">
      <div className="section-header-simple">
        <h2 className="section-title">CHECKOUT</h2>
        <span className="checkout-step">STEP 01 / SHIPPING</span>
      </div>

      <div className="checkout-grid">
        <div className="checkout-left">
          <AddressForm />
        </div>
        <div className="checkout-right">
          <OrderSummary />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
