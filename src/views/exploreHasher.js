import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";
import "../assets/css/elements.css";

import { Link } from 'react-router-dom';
import React from 'react';


import ImageHashGenerator from '../tools/ImageHashGenerator';


function AdexploreHashPage() {

  return (
    <div id="container">
      <Link to='/home'>
        <button id="backButton">HOME</button>
      </Link>
      <div>
        <h1>Image Hash Generator</h1>
        <ImageHashGenerator />
      </div>
    </div>
  );
}

export default AdexploreHashPage;
