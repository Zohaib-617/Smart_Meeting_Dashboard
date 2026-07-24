// components/features/upload/TranscriptUploader.jsx
import React from 'react'
import Button from '../../ui/Button'
import { parseTranscript } from '../../../services/transcriptParser'
import { extractInsights } from '../../../services/extractInsights'
import { summarizeMeeting } from '../../../services/summarize'
import { useMeetingsContext } from '../../../context/MeetingsContext'

const TranscriptUploader = () => {
  const { meetings, setMeetings, actionItems, setActionItems } = useMeetingsContext()

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const rawText = await file.text()
    const meeting = parseTranscript(rawText)
    const { decisions, actionItems: newActionItems } = extractInsights(meeting)
    meeting.decisions = decisions
    meeting.summary = summarizeMeeting(meeting, decisions)

    setMeetings([...meetings, meeting])
    setActionItems([...actionItems, ...newActionItems])
  }

  return (
    <div className="transcript-uploader">
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <Button variant="primary">Upload transcript</Button>
    </div>
  )
}

export default TranscriptUploader