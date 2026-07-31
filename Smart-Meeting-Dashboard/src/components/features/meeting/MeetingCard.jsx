// components/features/meetings/MeetingCard.jsx
import React, { useState } from 'react'
import Card from '../../ui/Card'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useMeetingsContext } from '../../../context/MeetingContext'

const MeetingCard = ({ meeting, onClick }) => {
  const { people, deleteMeeting } = useMeetingsContext()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const participants = meeting.participantIds
    .map((id) => people.find((p) => p.id === id))
    .filter(Boolean)

  const initials = (name) =>
    name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setIsConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteMeeting(meeting.id)
    setIsConfirmOpen(false)
  }

  return (
    <>
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={() => onClick(meeting.id)}>
              Open
            </button>
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </Card>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        message={`Delete "${meeting.title}"? This can't be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  )
}

export default MeetingCard