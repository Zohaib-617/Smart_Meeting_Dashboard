// pages/MeetingDetail.jsx
import React, { useState } from 'react'
import Tabs from '../components/ui/Tabs'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EditMeetingModal from '../components/features/meeting/EditMeetingModal'
import DecisionsPanel from '../components/features/decisions/DecisionsPanel'
import ActionItemsPanel from '../components/features/action-items/ActionItemsPanel'
import SummaryPanel from '../components/features/summary/SummaryPanel'
import { extractInsights } from '../services/extractInsights'
import { summarizeMeeting } from '../services/summarize'
import { useMeetingsContext } from '../context/MeetingContext'

const MeetingDetail = () => {
  const { meetings, selectedMeetingId, setSelectedMeetingId, deleteMeeting, updateMeeting } =
    useMeetingsContext()
  const [activeTab, setActiveTab] = useState('Transcript')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const meeting = meetings.find((m) => m.id === selectedMeetingId)

  if (!meeting) return null

  const handleClose = () => setSelectedMeetingId(null)

  const handleConfirmDelete = () => {
    deleteMeeting(meeting.id)
    setIsConfirmOpen(false)
    setSelectedMeetingId(null)
  }

  const handleRegenerate = () => {
    const { decisions } = extractInsights(meeting)
    const summary = summarizeMeeting(meeting, decisions)
    updateMeeting({ ...meeting, summary })
  }

  return (
    <>
      <Modal isOpen={true} onClose={handleClose}>
        <div className="modal-header">
          <div>
            <h2>{meeting.title}</h2>
            <p>{meeting.date}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
              Edit
            </Button>
            <Button variant="secondary" onClick={() => setIsConfirmOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        <Tabs
          tabs={['Transcript', 'Decisions', 'Action Items', 'Summary']}
          activeTab={activeTab}
          onChange={setActiveTab}
        >
          {activeTab === 'Transcript' && <p className="transcript-text">{meeting.transcript}</p>}
          {activeTab === 'Decisions' && <DecisionsPanel meeting={meeting} />}
          {activeTab === 'Action Items' && <ActionItemsPanel meetingId={meeting.id} />}
          {activeTab === 'Summary' && (
            <SummaryPanel meeting={meeting} onRegenerate={handleRegenerate} />
          )}
        </Tabs>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        message={`Delete "${meeting.title}"? This can't be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />

      <EditMeetingModal
        isOpen={isEditOpen}
        meeting={meeting}
        onClose={() => setIsEditOpen(false)}
        onSave={updateMeeting}
      />
    </>
  )
}

export default MeetingDetail