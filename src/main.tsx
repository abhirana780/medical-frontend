import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { Buffer } from 'buffer';
import './index.css'
import App from './App.tsx'

// Polyfill Buffer for @react-pdf/renderer
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
