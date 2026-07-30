// components/features/meetings/MeetingCard.jsx
import React from 'react'
import Card from '../../ui/Card'
import { useMeetingsContext } from '../../../context/MeetingContext'

const MeetingCard = ({ meeting, onClick }) => {
  const { people } = useMeetingsContext()
  const participants = meeting.participantIds
    .map((id) => people.find((p) => p.id === id))
    .filter(Boolean)

  const initials = (name) =>
    name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontWeight: 500, fontSize: '14px' }}>{meeting.title}</span>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--color-secondary)', marginBottom: '10px' }}>
        {meeting.date}
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        <span className="tag">Meeting</span>
        <span className="tag">{meeting.team}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="avatar-stack">
          {participants.map((p) => (
            <div key={p.id} className="avatar" title={p.name}>
              {initials(p.name)}
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" onClick={() => onClick(meeting.id)}>
          Open
        </button>
      </div>
    </Card>
  )
}

export default MeetingCard