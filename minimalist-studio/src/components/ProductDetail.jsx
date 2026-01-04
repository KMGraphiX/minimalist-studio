import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (product && product.inStock !== false) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  // Memoize product to prevent unnecessary re-renders
  const memoizedProduct = useMemo(() => product, [product]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Product not found");
          setProduct(null);
        }
      } catch (error) {
        console.error("Firebase Fetch Error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) return (
    <section className="product-detail-section">
      <div className="detail-container">
        <div className="loading-skeleton-detail">
          <div className="skeleton-image-large"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      </div>
    </section>
  );

  if (!memoizedProduct) return <section className="product-detail-section"><p>PRODUCT NOT FOUND</p></section>;

  return (
    <section className="product-detail-section">
      <div className="detail-container">

        {/* LEFT COLUMN: PRIMARY IMAGE PLACEHOLDER */}
        <div className="detail-visuals">
          <div className="primary-view-frame">
            <div className="product-image-placeholder">
              <div className="bw-detail-placeholder">
                <div className="detail-pattern"></div>
                <span className="detail-placeholder-text">STUDIO_772</span>
              </div>
              {!imageError && (
                <img
                  src={`https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=70&sat=-100`}
                  alt={memoizedProduct.title}
                  className={`detail-image ${imageLoaded ? 'loaded' : 'loading'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              )}
              <div className="corner-accents"></div>
            </div>
          </div>

          <div className="thumbnail-strip">
            {memoizedProduct.images?.map((img, i) => (
              <div key={i} className="thumbnail-box">
                <div className="bw-thumbnail-placeholder">
                  <div className="thumb-pattern"></div>
                  <span className="thumb-text">{img}</span>
                </div>
              </div>
            )) || <div className="thumbnail-box">
              <div className="bw-thumbnail-placeholder">
                <div className="thumb-pattern"></div>
                <span className="thumb-text">V_1</span>
              </div>
            </div>}
          </div>
        </div>

        {/* RIGHT COLUMN: CONTENT */}
        <div className="detail-content">
          <div className="content-sticky-wrapper">
            <span className="product-category">{memoizedProduct.category || 'ELECTRONICS'}</span>
            <h1 className="product-title-large">{memoizedProduct.title}</h1>
            <p className="product-price-large">${memoizedProduct.price?.toLocaleString() || '0'}.00</p>
            <p className="availability-status">● AVAILABLE / READY TO SHIP</p>

            <div className="content-body">
              <p className="description-text">{memoizedProduct.description || 'Premium quality electronic device.'}</p>
              <div className="technical-meta">
                <div className="meta-row"><span>SKU</span> <span>{memoizedProduct.sku || 'STU-772-01'}</span></div>
                <div className="meta-row"><span>WARRANTY</span> <span>{memoizedProduct.warranty || '24 MONTH LIMITED WARRANTY'}</span></div>
              </div>
            </div>

            <div className="purchase-actions">
              <div className="qty-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>—</button>
                <span className="qty-value">{quantity.toString().padStart(2, '0')}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button onClick={handleAddToCart} className="add-to-cart-btn">ADD TO CART</button>
              <button className="wishlist-text-btn">ADD TO WISHLIST</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;