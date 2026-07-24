// Dashboard.jsx
import React from 'react'
import SearchBar from '../components/features/search/SearchBar'
import FilterPanel from '../components/features/search/FilterPanel'
import StatsOverview from '../components/features/stats/StatsOverview'
import MeetingList from '../components/features/meeting/MeetingList'
import  useFilteredMeetings  from '../hooks/useFilteredMeetings'
import { useMeetingsContext } from '../context/MeetingContext'

const Dashboard = () => {
  const filteredMeetings = useFilteredMeetings()
  const { setSelectedMeetingId } = useMeetingsContext()

  return (
    <div className="dashboard">
      <StatsOverview />

      <div className="dashboard-controls">
        <SearchBar />
        <FilterPanel />
      </div>

      <MeetingList
        meetings={filteredMeetings}
        onSelectMeeting={setSelectedMeetingId}
      />
    </div>
  )
}

export default Dashboard