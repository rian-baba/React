import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import MainContext from './MainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContext>
    <Home />
    </MainContext>
  </StrictMode>,
)
