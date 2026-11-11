import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearningPathsPage from './pages/LearningPathsPage';
import TrackDetailPage from './pages/TrackDetailPage';
import BrochurePage from './pages/BrochurePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning-paths" element={<LearningPathsPage />} />
        <Route path="/learning-paths/:trackId" element={<TrackDetailPage />} />
        <Route path="/brochure" element={<BrochurePage />} />
        <Route path="/card" element={<BrochurePage />} />
        <Route path="/qr" element={<BrochurePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}