import React, { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from './ProductCard';

const ProductGrid = ({ activeCategory = 'All' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ normalize category (VERY IMPORTANT)
  const normalizedCategory =
    activeCategory && activeCategory !== 'All'
      ? activeCategory.toLowerCase()
      : 'All';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');

        let q;

        // ✅ category filter
        if (normalizedCategory !== 'All') {
          q = query(
            productsRef,
            where('category', '==', normalizedCategory),
            limit(20)
          );
        } else {
          q = query(productsRef, limit(50));
        }

        const querySnapshot = await getDocs(q);

        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Firebase Fetch Error:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [normalizedCategory]);

  const memoizedProducts = useMemo(() => products, [products]);

  // ✅ loading state
  if (loading) {
    return (
      <section className="product-grid-section">
        <div className="loading-skeleton">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-price"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ✅ final render
  return (
    <section className="product-grid-section" id="products">
      <div className="product-grid">
        {memoizedProducts.length > 0 ? (
          memoizedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
