// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImageUploader from './components/ImageUploader';
import VideoUploader from './components/VideoUploader';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/image" element={<ImageUploader />} />
                <Route path="/video" element={<VideoUploader />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
