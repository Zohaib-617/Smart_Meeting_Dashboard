// components/features/upload/TranscriptUploader.jsx
import React, { useState } from 'react'
import Button from '../../ui/Button'
import LoadingSpinner from '../../ui/LoadingSpinner'
import { parseTranscript } from '../../../services/transcriptParser'
import { extractInsights } from '../../../services/extractInsights'
import { summarizeMeeting } from '../../../services/summarize'
import { useMeetingsContext } from '../../../context/MeetingContext'

const TranscriptUploader = () => {
  const { meetings, setMeetings, actionItems, setActionItems } = useMeetingsContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setError(null)

    if (!file.name.endsWith('.txt')) {
      setError('Only .txt files are supported right now.')
      return
    }

    setIsLoading(true)

    try {
      const rawText = await file.text()

      if (!rawText.trim()) {
        setError('That file appears to be empty.')
        return
      }

      const meeting = parseTranscript(rawText)
      const { decisions, actionItems: newActionItems } = extractInsights(meeting)
      meeting.decisions = decisions
      meeting.summary = summarizeMeeting(meeting, decisions)

      setMeetings([...meetings, meeting])
      setActionItems([...actionItems, ...newActionItems])
    } catch (err) {
      setError('Something went wrong reading that file.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="transcript-uploader">
      <input type="file" accept=".txt" onChange={handleFileChange} disabled={isLoading} />
      <Button variant="primary" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload transcript'}
      </Button>
      {isLoading && <LoadingSpinner />}
      {error && <p style={{ color: '#B91C1C' }}>{error}</p>}
    </div>
  )
}

export default TranscriptUploader