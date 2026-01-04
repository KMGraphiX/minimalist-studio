import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const {
    id,
    title = "Product",
    price = 0,
    image = "",
    stock = 0,
  } = product;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // SAFE initial (no split crash)
  const productInitial = title ? title.charAt(0) : "P";

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-placeholder-img">
          <div className="bw-product-placeholder">
            <div className="product-pattern"></div>
            <span className="product-initial">{productInitial}</span>
          </div>

          {!imageError && image && (
            <img
              src={image}
              alt={title}
              className={`product-image ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">₹{price.toLocaleString()}</p>

        <p className={`product-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {stock > 0 ? '— IN STOCK' : '— SOLD OUT'}
        </p>

        <Link to={`/product/${id}`} className="view-product-link">
          VIEW PRODUCT
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
