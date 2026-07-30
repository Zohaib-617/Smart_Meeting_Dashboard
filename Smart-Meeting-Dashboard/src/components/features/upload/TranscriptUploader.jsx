// components/features/upload/TranscriptUploader.jsx
import React, { useState, useRef } from 'react'
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
  const fileInputRef = useRef(null)

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

  const openFilePicker = () => {
    if (!isLoading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="transcript-uploader">
      <div className="upload-dropzone">
        <div className="upload-card">
            <div className="upload-icon-square">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="upload-icon-svg">
                <path d="M19.35 10.04A7.49 7.49 0 0012 4a7.5 7.5 0 00-7.34 6.03A5.5 5.5 0 007.5 21h11a4.5 4.5 0 000-9h-.15z" fill="currentColor" />
              </svg>
            </div>
            <div className="upload-center">
              <p>Upload a transcript</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                disabled={isLoading}
                hidden
              />
              <Button onClick={openFilePicker} variant="primary" disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Choose file'}
              </Button>
              <span className="upload-hint">Only text files are supported.</span>
            </div>
            {isLoading && <LoadingSpinner />}
          </div>
      </div>
      {error && <p className="upload-error">{error}</p>}
    </div>
  )
}

export default TranscriptUploader