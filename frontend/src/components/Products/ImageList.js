// ImageList.js

import React, { useState, useEffect } from 'react';
import './ImageList.css';

const ImageList = ({ imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Move to the next image or loop back to the first image
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [imageUrls.length]);

  return (
    <div className="image-list">
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="image-container">
          {/* <h4>{imageUrl}</h4> */}
          <img
            src={require(`${imageUrl}`)}
            alt={`item-${index + 1}`}
            className={`image ${index === currentImageIndex ? 'active-image' : ''}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
