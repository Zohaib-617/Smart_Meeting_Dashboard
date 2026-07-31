// components/features/upload/TranscriptUploader.jsx
import React, { useState } from 'react'
import LoadingSpinner from '../../ui/LoadingSpinner'
import { parseTranscript } from '../../../services/transcriptParser'
import { extractInsights } from '../../../services/extractInsights'
import { summarizeMeeting } from '../../../services/summarize'
import { useMeetingsContext } from '../../../context/MeetingContext'

const resolveParticipants = (speakerNames, people, setPeople) => {
  const updatedPeople = [...people]
  const participantIds = []

  speakerNames.forEach((name) => {
    let person = updatedPeople.find((p) => p.name.toLowerCase() === name.toLowerCase())
    if (!person) {
      person = { id: `p-${Date.now()}-${name}`, name, team: 'Unassigned' }
      updatedPeople.push(person)
    }
    participantIds.push(person.id)
  })

  setPeople(updatedPeople)
  return participantIds
}

const TranscriptUploader = () => {
  const { meetings, setMeetings, actionItems, setActionItems, people, setPeople } = useMeetingsContext()
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
      meeting.participantIds = resolveParticipants(meeting.speakerNames, people, setPeople)

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
      <div className="upload-dropzone">
        <div className="upload-card">
          <div className="upload-icon-square" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="upload-icon-svg">
              <path d="M12 16V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M8.5 8.5L12 5l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 15.5v1.8a1.7 1.7 0 0 0 1.7 1.7h10.6a1.7 1.7 0 0 0 1.7-1.7v-1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>

          <div className="upload-center">
            {isLoading ? <LoadingSpinner /> : <p>Upload your transcript</p>}
            <span className="upload-hint">
              Choose a .txt file to turn it into a polished meeting summary.
            </span>
            <label className="btn btn-primary upload-button">
              <input type="file" accept=".txt" onChange={handleFileChange} disabled={isLoading} />
              {isLoading ? 'Uploading…' : 'Choose file'}
            </label>
          </div>
        </div>
      </div>
      {error && <p className="upload-error">{error}</p>}
    </div>
  )
}

export default TranscriptUploader