import React, { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from './ProductCard';

const ProductGrid = ({ activeCategory = 'All' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        
        // Filter by category if not 'All', limit results for performance
        const q = (activeCategory && activeCategory !== 'All') 
          ? query(productsRef, where("category", "==", activeCategory), limit(20))
          : query(productsRef, limit(50));

        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetched);
      } catch (error) {
        console.error("Firebase Fetch Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Memoize products to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => products, [products]);

  if (loading) return (
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