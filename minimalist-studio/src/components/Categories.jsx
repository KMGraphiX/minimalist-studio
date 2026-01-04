import React from 'react';
import { useNavigate } from 'react-router-dom';

const categoryData = [
  { id: 1, title: 'Smartphones', imgId: '1511707171634-5f897ff02aa9' },
  { id: 2, title: 'Laptops', imgId: '1496181133206-80ce9b88a853' },
  { id: 3, title: 'Headphones', imgId: '1505740420928-5e560c06d30e' },
  { id: 4, title: 'Smart Watches', imgId: '1523275335684-37898b6baf30' },
  { id: 5, title: 'Tablets', imgId: '1544244015-0df4b3ffc6b0' },
  { id: 6, title: 'Cameras', imgId: '1516035069371-29a1b244cc32' },
  { id: 7, title: 'Gaming Accessories', imgId: '1542751371-adc38448a05e' },
  { id: 8, title: 'Smart Home Devices', imgId: '1489066650533-3331b40285a8' }, // New Fixed Image ID
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section style={{ background: '#fff', padding: '60px 0', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ letterSpacing: '4px', fontSize: '0.9rem', marginBottom: '40px', textAlign: 'center' }}>
          CATEGORIES
        </h2>
        
        <div style={{ 
          display: 'grid', 
          // 4 columns on large screens, 2 on tablet, 1 on mobile
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px',
          background: 'transparent' // Removes the black background
        }}>
          {categoryData.map((category) => (
            <div 
              key={category.id} 
              onClick={() => navigate(`/category/${category.title}`)}
              style={{ 
                cursor: 'pointer',
                textAlign: 'center',
                background: '#fff',
                padding: '10px'
              }}
            >
              <div style={{ 
                width: '100%', 
                aspectRatio: '1/1', 
                overflow: 'hidden', 
                backgroundColor: '#f9f9f9', // Very light grey instead of black
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={`https://images.unsplash.com/photo-${category.imgId}?auto=format&fit=crop&w=500&q=80&sat=-100`}
                  alt={category.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'contrast(1.05)'
                  }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Device'; }}
                />
              </div>
              
              <div style={{ marginTop: '15px' }}>
                <h3 style={{ fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0' }}>
                  {category.title}
                </h3>
                <p style={{ fontSize: '10px', opacity: 0.5, marginTop: '5px' }}>EXPLORE</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;