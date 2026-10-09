import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Keycloak's adapter must be initialized once; omitting StrictMode avoids its
// development-only effect replay from starting initialization twice.
createRoot(document.getElementById('root')).render(<App/>);
