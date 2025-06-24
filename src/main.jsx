import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal'; // Import Modal
import './index.css';
import App from './App.jsx';

// Set the app element for Modal
Modal.setAppElement('#root');

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    console.error("Root element not found!");
  }
});
