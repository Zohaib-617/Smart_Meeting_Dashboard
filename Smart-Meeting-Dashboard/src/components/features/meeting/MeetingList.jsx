// meetings/MeetingList.jsx
import React from 'react'
import MeetingCard from './MeetingCard'
import EmptyState from '../../ui/EmptyState'

const MeetingList = ({ meetings, onSelectMeeting }) => {
  if (!meetings || meetings.length === 0) {
    return <EmptyState message="No meetings match your filters." />
  }

  return (
    <div className="meeting-list">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} onClick={onSelectMeeting} />
      ))}
    </div>
  )
}

export default MeetingList