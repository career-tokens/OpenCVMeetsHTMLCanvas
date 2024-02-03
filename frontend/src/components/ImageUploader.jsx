import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const [imageData, setImageData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageData) {
      drawBoundingBoxes();
    }
  }, [imageData, boundingBoxes]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const base64Data = event.target.result.split(',')[1]; // Extract base64 data
      setImageData(base64Data);

      try {
        // Send the base64 image data to the backend
        const response = await axios.post('http://localhost:5000/api/process-image/', { base64Data }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Extract bounding box coordinates from the response
        const { bounding_boxes } = response.data;
        setBoundingBoxes(bounding_boxes);
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error('Error processing image:', error);
      }
    };

    reader.readAsDataURL(file); // Read as base64 data URL
  };

  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = `data:image/jpeg;base64,${imageData}`;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Draw bounding boxes
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      boundingBoxes.forEach((box) => {
        const [x, y, width, height] = box;
        ctx.strokeRect(x, y, width, height);
      });
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <h2>Bounding Box Coordinates</h2>
      <ul>
        {boundingBoxes.map((box, index) => (
          <li key={index}>
            X: {box[0]}, Y: {box[1]}, Width: {box[2]}, Height: {box[3]}
          </li>
        ))}
      </ul>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageUploader;
