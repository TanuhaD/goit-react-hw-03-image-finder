import React from 'react';

function ImageGalleryItem({ id, img, onImageClick }) {
  return (
    <div>
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={img}
          alt=""
          onClick={() => onImageClick(id)}
        />
      </li>
    </div>
  );
}

export default ImageGalleryItem;
