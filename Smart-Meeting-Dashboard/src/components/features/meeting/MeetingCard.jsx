// meetings/MeetingCard.jsx
import React from 'react'
import Card from '../../ui/Card'
import { useMeetingsContext } from '../../../context/MeetingContext'

const MeetingCard = ({ meeting, onClick }) => {
  const { people } = useMeetingsContext()
  const participantNames = meeting.participantIds
    .map((id) => people.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join(', ')

  return (
    <Card>
      <div onClick={() => onClick(meeting.id)}>
        <h3>{meeting.title}</h3>
        <p>{meeting.date} · {participantNames}</p>
        <p>{meeting.decisions.length} decisions</p>
      </div>
    </Card>
  )
}

export default MeetingCard