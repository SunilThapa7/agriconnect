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
          </p>          <div className="hero-buttons">
            <Link to="/signup" className="btn primary">Get Started</Link>
            <Link to="/agrimarket" className="btn secondary">Shop Agricultural Supplies</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
