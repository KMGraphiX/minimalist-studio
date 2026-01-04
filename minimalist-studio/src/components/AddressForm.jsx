import React from 'react';

const AddressForm = () => {
  return (
    <div className="address-form-container">
      <h3 className="checkout-subheadline">SHIPPING ADDRESS</h3>
      <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <input type="text" placeholder="FULL NAME" className="checkout-input" />
        </div>
        <div className="form-row">
          <input type="email" placeholder="EMAIL ADDRESS" className="checkout-input" />
          <input type="tel" placeholder="PHONE NUMBER" className="checkout-input" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="STREET ADDRESS" className="checkout-input" />
        </div>
        <div className="form-row">
          <input type="text" placeholder="CITY" className="checkout-input" />
          <input type="text" placeholder="STATE / PROVINCE" className="checkout-input" />
        </div>
        <div className="form-row">
          <input type="text" placeholder="POSTAL CODE" className="checkout-input" />
          <input type="text" placeholder="COUNTRY" className="checkout-input" />
        </div>
        <button className="continue-payment-btn" disabled>
          CONTINUE TO PAYMENT
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
