import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "@fontsource/poppins/100.css"; // Thin
import "@fontsource/poppins/200.css"; // Extra Light
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular (Normal)
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/600.css"; // Semi Bold
import "@fontsource/poppins/700.css"; // Bold
import "@fontsource/poppins/800.css"; // Extra Bold
import "@fontsource/poppins/900.css"; // Black
import '@fontsource/share-tech-mono';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
