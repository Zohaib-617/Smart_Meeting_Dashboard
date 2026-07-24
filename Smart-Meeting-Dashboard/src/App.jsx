// App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import MeetingDetail from './pages/MeetingDetail'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import { MeetingsProvider } from './context/MeetingContext'
const App = () => {
  return (
    <MeetingsProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Sidebar />
          <div className="app-main">
            <Topbar />
            <div className="app-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/meetings" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </div>
        <MeetingDetail />
      </BrowserRouter>
    </MeetingsProvider>
  )
}

export default App