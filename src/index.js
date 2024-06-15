import React from 'react';
import ReactDOM from 'react-dom/client';
import { FirebaseProvider } from './utils/Firebase'
import './main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FirebaseProvider>
    <App />
    </FirebaseProvider>
);

