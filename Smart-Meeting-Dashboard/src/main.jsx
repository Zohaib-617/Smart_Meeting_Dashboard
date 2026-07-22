import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {MeetingsProvider} from './context/MeetingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <MeetingsProvider>
      <App />
  </MeetingsProvider>
  </StrictMode>,
)
