import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  
  // Access cart state to show cart count on landing page
  const cartTotalQuantity = useSelector((state) => 
    state.cart?.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
  );

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            
            {/* Show cart count on landing page if there are items */}
            {cartTotalQuantity > 0 && (
              <div className="landing-cart-notification">
                <span className="cart-count-badge">{cartTotalQuantity}</span>
                <span className="cart-notification-text">items in your cart</span>
              </div>
            )}
            
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

export default App;



