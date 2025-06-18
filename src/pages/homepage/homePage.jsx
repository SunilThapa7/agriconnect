import React from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <img
          src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Nepali farmer in the field"
          className="hero-background"
        />
        <div className="hero-content">
          <h1>Digital Solutions for Nepal's Farmers</h1>
          <p>
            Access weather forecasts, market prices, training resources, and connect with agricultural experts — all in one place.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn primary">Get Started</Link>
            <Link to="/agrimarket" className="btn secondary">Shop Agricultural Supplies</Link>
          </div>
        </div>
      </section>

      {/* AgriMarket Preview Section */}
      <section className="agrimarket-preview">
        <div className="preview-header">
          <h2>AgriMarket</h2>
          <p>Discover fresh produce and agricultural products from local farmers</p>
        </div>
        
        <div className="preview-products">
          <div className="preview-card">
            <div className="card-image vegetables"></div>
            <h3>Fresh Vegetables</h3>
            <p>Farm-fresh vegetables delivered to your doorstep</p>
            <Link to="/agrimarket" className="preview-link">Browse Vegetables</Link>
          </div>
          
          <div className="preview-card">
            <div className="card-image fruits"></div>
            <h3>Seasonal Fruits</h3>
            <p>Handpicked seasonal fruits from local orchards</p>
            <Link to="/agrimarket" className="preview-link">Browse Fruits</Link>
          </div>
          
          <div className="preview-card">
            <div className="card-image grains"></div>
            <h3>Organic Grains</h3>
            <p>Quality grains from Nepali farmers</p>
            <Link to="/agrimarket" className="preview-link">Browse Grains</Link>
          </div>
        </div>
        
        <div className="preview-footer">
          <Link to="/agrimarket" className="btn primary">View All Products</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
