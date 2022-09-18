import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';


const mountNode = document.getElementById("app");
const root = createRoot(mountNode as Element);
root.render(<App />);
