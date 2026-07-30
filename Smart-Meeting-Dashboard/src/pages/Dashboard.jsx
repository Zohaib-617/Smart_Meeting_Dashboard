// pages/Dashboard.jsx
import React from 'react'
import SearchBar from '../components/features/search/SearchBar'
import FilterPanel from '../components/features/search/FilterPanel'
import StatsOverview from '../components/features/stats/StatsOverview'
import MeetingList from '../components/features/meeting/MeetingList'
import HistoryList from '../components/features/meeting/HistoryList'
import QuickActions from '../components/features/dashboard/QuickActions'
import  useFilteredMeetings  from '../hooks/useFilteredMeetings'
import { useMeetingsContext } from '../context/MeetingContext'

const Dashboard = () => {
  const filteredMeetings = useFilteredMeetings()
  const { setSelectedMeetingId } = useMeetingsContext()

  return (
    <div className="dashboard">
      <QuickActions />

      <StatsOverview />

      <div className="dashboard-controls">
        <SearchBar />
        <FilterPanel />
      </div>

      <h2>Recent meetings</h2>
      <MeetingList
        meetings={filteredMeetings}
        onSelectMeeting={setSelectedMeetingId}
      />

      <h2 style={{ marginTop: '24px' }}>History</h2>
      <HistoryList onSelectMeeting={setSelectedMeetingId} />
    </div>
  )
}

export default Dashboard