// App.jsx (updated)
import React from 'react'
import Dashboard from './pages/Dashboard'
import MeetingDetail from './pages/MeetingDetail'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import { MeetingsProvider } from './context/MeetingContext'

const App = () => {
  return (
    <MeetingsProvider>
      <div className="app-layout">
        <Sidebar />
        <div className="app-main">
          <Topbar />
          <div className="app-content">
            <Dashboard />
          </div>
        </div>
      </div>
      <MeetingDetail />
    </MeetingsProvider>
  )
}

export default App