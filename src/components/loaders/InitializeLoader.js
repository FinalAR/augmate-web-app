// LoaderComponent.js

import React from 'react';
import './../../assets/css/initLoader.css';

const InitializeLoader = () => {
  return (
    <div id="root">
      <div className="loader-container">
        <span>Preparing Data</span>
        <div className="loader">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default InitializeLoader;
