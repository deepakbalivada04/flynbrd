import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearningPathsPage from './pages/LearningPathsPage';
import TrackDetailPage from './pages/TrackDetailPage';
import BookDemoPage from './pages/BookDemoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning-paths" element={<LearningPathsPage />} />
        <Route path="/learning-paths/:trackId" element={<TrackDetailPage />} />
        <Route path="/book-demo" element={<BookDemoPage />} />
        <Route path="/book-a-live-demo" element={<BookDemoPage />} />
        <Route path="/demo" element={<BookDemoPage />} />
        
        {/* Redirect old brochure & qr routes to book-demo */}
        <Route path="/brochure" element={<Navigate to="/book-demo" replace />} />
        <Route path="/card" element={<Navigate to="/book-demo" replace />} />
        <Route path="/qr" element={<Navigate to="/book-demo" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}