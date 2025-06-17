import React from 'react';
import './agriMarket.css';

const AgriMarket = () => {
  return (
    <div className="agrimarket-container">
      <h1>Welcome to AgriMarket</h1>
      <div className="market-content">
        <section className="intro-section">
          <h2>Fresh Products Direct from Farmers</h2>
          <p>Discover local, fresh, and sustainable agricultural products from farmers in your area.</p>
        </section>
        
        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <h3>Fresh Vegetables</h3>
              <p>Locally sourced, organic vegetables</p>
            </div>
            <div className="product-card">
              <h3>Seasonal Fruits</h3>
              <p>Hand-picked, fresh fruits</p>
            </div>
            <div className="product-card">
              <h3>Organic Grains</h3>
              <p>Quality grains from local farmers</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AgriMarket;