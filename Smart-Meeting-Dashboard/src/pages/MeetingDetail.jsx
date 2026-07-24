// pages/MeetingDetail.jsx
import React, { useState } from 'react'
import Tabs from '../components/ui/Tabs'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import DecisionsPanel from '../components/features/decisions/DecisionsPanel'
import ActionItemsPanel from '../components/features/action-items/ActionItemsPanel'
import SummaryPanel from '../components/features/summary/SummaryPanel'
import { useMeetingsContext } from '../context/MeetingContext'

const MeetingDetail = () => {
  const { meetings, selectedMeetingId, setSelectedMeetingId, deleteMeeting } = useMeetingsContext()
  const [activeTab, setActiveTab] = useState('Transcript')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const meeting = meetings.find((m) => m.id === selectedMeetingId)

  if (!meeting) return null

  const handleClose = () => setSelectedMeetingId(null)

  const handleConfirmDelete = () => {
    deleteMeeting(meeting.id)
    setIsConfirmOpen(false)
    setSelectedMeetingId(null)
  }

  return (
    <>
      <Modal isOpen={true} onClose={handleClose}>
        <div className='modal-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>{meeting.title}</h2>
            <p>{meeting.date}</p>
          </div>
          <Button variant="secondary" onClick={() => setIsConfirmOpen(true)}>
            Delete
          </Button>
        </div>

        <Tabs
          tabs={['Transcript', 'Decisions', 'Action Items', 'Summary']}
          activeTab={activeTab}
          onChange={setActiveTab}
        >
          {activeTab === 'Transcript' && <p className="transcript-text">{meeting.transcript}</p>}
          {activeTab === 'Decisions' && <DecisionsPanel meeting={meeting} />}
          {activeTab === 'Action Items' && <ActionItemsPanel meetingId={meeting.id} />}
          {activeTab === 'Summary' && <SummaryPanel meeting={meeting} onRegenerate={() => {}} />}
        </Tabs>
      </Modal>

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

export default MeetingDetail