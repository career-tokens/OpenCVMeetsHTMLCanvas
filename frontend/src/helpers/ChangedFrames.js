import axios from "axios";

export const changedFrames = async (frames,canvasRef) => {
    //let newFrames = [];
    for (let i = 0; i < frames.length; i++)
    {
        let currentFrame = frames[i];
        console.log(currentFrame)
            // Send the base64 image data to the backend
            const response = await axios.post('http://localhost:5000/api/process-image/', { base64Data:currentFrame.split(',')[1] }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            // Extract bounding box coordinates from the response
        const { bounding_boxes } = response.data;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        const img = new Image();
        img.src = currentFrame;
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
    
          // Draw the image
          ctx.drawImage(img, 0, 0);
    
          // Draw bounding boxes
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          bounding_boxes.forEach((box) => {
            const [x, y, width, height] = box;
            ctx.strokeRect(x, y, width, height);
          });
        };

        }
}