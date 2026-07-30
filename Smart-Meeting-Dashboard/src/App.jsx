// App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import MeetingDetail from './pages/MeetingDetail'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import { MeetingsProvider } from './context/MeetingContext'
import ActionItemsPage from './pages/ActionItemsPage'
import PeoplePage from './pages/PeoplePage'
import StatsPage from './pages/StatsPage'
import AllMeetingsPage from './pages/AllMeetingsPage'
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
              <Route path="/meetings" element={<AllMeetingsPage />} />
              <Route path="/action-items" element={<ActionItemsPage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/stats" element={<StatsPage />} />
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