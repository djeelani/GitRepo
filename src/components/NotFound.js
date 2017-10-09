import React from 'react';
import '../assets/stylesheets/NotFound.scss';

const NotFound = () =>
  <div className="error-page">
    <h2>404 Page not found</h2>
    <p className="error-page__text">
      We are sorry but the page you are looking for does not exist.
    </p>
  </div>;

export default NotFound;
