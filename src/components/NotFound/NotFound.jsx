import React from 'react';
import img2 from '../asset/image/notfound.jpg'

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={img2} // Test branch to Nithi
        alt="Not Found"
        style={{ maxWidth: '30%', height: 'auto', marginTop: '50px' }}
      />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for might be unavailable or does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
