import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    // You could also add an API call here to store the email.
    setSubscribed(true);
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updates</p>
      <br />
      <br />
      <div>
        <input type="email" placeholder="Your Email Id" />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>

      {/* Conditionally render the "Subscribed!" message */}
      {subscribed && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          Subscribed!
        </p>
      )}
    </div>
  );
};

export default Newsletter;
