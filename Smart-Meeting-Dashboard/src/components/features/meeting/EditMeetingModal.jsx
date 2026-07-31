// components/features/meetings/EditMeetingModal.jsx
import React, { useState, useEffect } from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { useMeetingsContext } from '../../../context/MeetingContext'

const EditMeetingModal = ({ isOpen, meeting, onClose, onSave }) => {
  const { people, setPeople } = useMeetingsContext()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [team, setTeam] = useState('')
  const [transcript, setTranscript] = useState('')
  const [participantTeams, setParticipantTeams] = useState({})

  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title)
      setDate(meeting.date)
      setTeam(meeting.team)
      setTranscript(meeting.transcript)

      const teamsById = {}
      meeting.participantIds.forEach((id) => {
        const person = people.find((p) => p.id === id)
        if (person) teamsById[id] = person.team
      })
      setParticipantTeams(teamsById)
    }
  }, [meeting])

  if (!meeting) return null

  const participants = meeting.participantIds
    .map((id) => people.find((p) => p.id === id))
    .filter(Boolean)

  const handleSave = () => {
    const updatedPeople = people.map((p) =>
      participantTeams[p.id] !== undefined ? { ...p, team: participantTeams[p.id] } : p
    )
    setPeople(updatedPeople)

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

      {participants.length > 0 && (
        <div className="edit-field">
          <label>Participants</label>
          {participants.map((person) => (
            <div key={person.id} className="edit-participant-row">
              <span>{person.name}</span>
              <input
                type="text"
                value={participantTeams[person.id] ?? person.team}
                onChange={(e) =>
                  setParticipantTeams({ ...participantTeams, [person.id]: e.target.value })
                }
                placeholder="Team"
              />
            </div>
          ))}
        </div>
      )}

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