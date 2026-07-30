// pages/Dashboard.jsx
import React from 'react'
import MeetingList from '../components/features/meeting/MeetingList'
import HistoryList from '../components/features/meeting/HistoryList'
import QuickActions from '../components/features/dashboard/QuickActions'
import { useMeetingsContext } from '../context/MeetingContext'

const Dashboard = () => {
  const { meetings, setSelectedMeetingId } = useMeetingsContext()

  return (
    <div className="dashboard">
      <QuickActions />

      <h2>Recent meetings</h2>
      <MeetingList meetings={meetings} onSelectMeeting={setSelectedMeetingId} />

      <h2 style={{ marginTop: '24px' }}>History</h2>
      <HistoryList onSelectMeeting={setSelectedMeetingId} />
    </div>
  )
}

export default Dashboard