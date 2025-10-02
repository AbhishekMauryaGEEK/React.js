// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Call from './App'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Call/>
  </StrictMode>
)