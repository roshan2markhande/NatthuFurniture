// File: src/components/ImageScroller.jsx
import React, { useEffect, useRef,useState } from 'react';
import '../Styles/ImageScroller.css'; // External CSS for styling

const ImageScroller = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3s

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="image-scroller">
      <div
        className="image-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="image-slide" key={index}>
            <img src={img} alt={`Product ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
