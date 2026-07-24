// pages/MeetingDetail.jsx
import React, { useState } from 'react'
import Tabs from '../components/ui/Tabs'
import Modal from '../components/ui/Modal'
import DecisionsPanel from '../components/features/decisions/DecisionsPanel'
import ActionItemsPanel from '../components/features/action-items/ActionItemsPanel'
import SummaryPanel from '../components/features/summary/SummaryPanel'
import { useMeetingsContext } from '../context/MeetingContext'

const MeetingDetail = () => {
  const { meetings, selectedMeetingId, setSelectedMeetingId } = useMeetingsContext()
  const [activeTab, setActiveTab] = useState('Transcript')

  const meeting = meetings.find((m) => m.id === selectedMeetingId)

  if (!meeting) return null

  const handleClose = () => setSelectedMeetingId(null)

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <h2>{meeting.title}</h2>
      <p>{meeting.date}</p>

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
  )
}

export default MeetingDetail