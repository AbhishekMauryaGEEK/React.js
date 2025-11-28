import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ImageTextExtractor from './converter.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageTextExtractor/>
  </StrictMode>,
)
