import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-placeholder-img">
          {/* Black and White Product Placeholder */}
          <div className="bw-product-placeholder">
            <div className="product-pattern"></div>
            <span className="product-initial">{product.title.split(' ')[0].charAt(0)}</span>
          </div>
          {/* Optimized image with loading states */}
          {!imageError && (
            <img
              src={`https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=60&sat=-100`}
              alt={product.title}
              className={`product-image ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <p className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? '— IN STOCK' : '— SOLD OUT'}
        </p>
        <Link to={`/product/${product.id}`} className="view-product-link">VIEW PRODUCT</Link>
      </div>
    </div>
  );
};

export default ProductCard;