import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import App from './App.tsx';
import AuthCallback from './pages/AuthCallback.tsx';
import ResetComplete from './pages/ResetComplete.tsx';
import './index.css';

// SPA routing:
// - /           → main app (App handles auth gating)
// - /auth/callback       → landing after email confirmation
// - /auth/reset-complete → landing after clicking password reset link
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/reset-complete" element={<ResetComplete />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
