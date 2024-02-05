import React, { useRef, useState } from 'react';
import { VideoToFrames, VideoToFramesMethod } from '../helpers/VideoToFrame';
import { changedFrames } from '../helpers/ChangedFrames';

const VideoUploader = () => {
    const [frames, setFrames] = useState([]);
    const canvasRef = useRef();

    const handleVideoUpload = async (event) => {
        const [file] = event.target.files;
        const fileUrl = URL.createObjectURL(file);
        const frames = await VideoToFrames.getFrames(
            fileUrl,
            30,
            VideoToFramesMethod.totalFrames
        );
        console.log(frames);
        changedFrames(frames, canvasRef);
    };

    // Set canvas dimensions
    const setCanvasDimensions = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.height = '60vh';
            canvas.style.width = '60vw';
        }
    };

    // Call the function to set canvas dimensions
    setCanvasDimensions();

    return (
        <div className="main h-screen w-screen flex flex-col items-center justify-evenly">
            <input type="file" accept="video/*" onChange={handleVideoUpload} />
            <canvas ref={canvasRef} />
        </div>
    );
};

export default VideoUploader;
