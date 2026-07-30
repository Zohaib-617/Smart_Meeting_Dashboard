// components/features/meetings/EditMeetingModal.jsx
import React, { useState, useEffect } from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

const EditMeetingModal = ({ isOpen, meeting, onClose, onSave }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [team, setTeam] = useState('')
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title)
      setDate(meeting.date)
      setTeam(meeting.team)
      setTranscript(meeting.transcript)
    }
  }, [meeting])

  if (!meeting) return null

  const handleSave = () => {
    onSave({
      ...meeting,
      title,
      date,
      team,
      transcript,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Edit meeting</h2>

      <div className="edit-field">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="edit-field">
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="edit-field">
        <label>Team</label>
        <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} />
      </div>

      <div className="edit-field">
        <label>Transcript</label>
        <textarea rows={8} value={transcript} onChange={(e) => setTranscript(e.target.value)} />
      </div>

      <div className="edit-modal-actions">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  )
}

export default EditMeetingModal