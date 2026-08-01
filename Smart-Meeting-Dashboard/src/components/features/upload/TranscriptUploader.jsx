// components/features/upload/TranscriptUploader.jsx
import React, { useState } from 'react'
import mammoth from 'mammoth/mammoth.browser'
import LoadingSpinner from '../../ui/LoadingSpinner'
import { parseTranscript } from '../../../services/transcriptParser'
import { extractInsights } from '../../../services/extractInsights'
import { summarizeMeeting } from '../../../services/summarize'
import { useMeetingsContext } from '../../../context/MeetingContext'

let personCounter = 0

const resolveParticipants = (speakerNames, people) => {
  const updatedPeople = [...people]
  const participantIds = []

  speakerNames.forEach((name) => {
    let person = updatedPeople.find((p) => p.name.toLowerCase() === name.toLowerCase())
    if (!person) {
      personCounter += 1
      person = { id: `p-new-${personCounter}-${Date.now()}`, name, team: 'Unassigned' }
      updatedPeople.push(person)
    }
    participantIds.push(person.id)
  })

  return { participantIds, updatedPeople }
}

const SUPPORTED_EXTENSIONS = ['.txt', '.md', '.docx']

const extractTextFromFile = async (file) => {
  const name = file.name.toLowerCase()

  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return file.text()
  }

  if (name.endsWith('.docx')) {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value
  }

  throw new Error('unsupported')
}

const TranscriptUploader = () => {
  const { meetings, setMeetings, actionItems, setActionItems, people, setPeople } = useMeetingsContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setError(null)

    const isSupported = SUPPORTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))
    if (!isSupported) {
      setError('Supported file types: .txt, .md, .docx')
      return
    }

    setIsLoading(true)

    try {
      const rawText = await extractTextFromFile(file)

      if (!rawText.trim()) {
        setError('That file appears to be empty.')
        return
      }

      const meeting = parseTranscript(rawText)

      const { participantIds, updatedPeople } = resolveParticipants(meeting.speakerNames, people)
      meeting.participantIds = participantIds
      setPeople(updatedPeople)

      const { decisions, actionItems: newActionItems } = extractInsights(meeting)
      meeting.decisions = decisions

      const resolvedActionItems = newActionItems.map((item) => {
        if (!item.assigneeName) return item
        const person = updatedPeople.find(
          (p) => p.name.toLowerCase() === item.assigneeName.toLowerCase()
        )
        return { ...item, assigneeId: person ? person.id : null }
      })

      meeting.summary = summarizeMeeting(meeting, decisions)

      setMeetings([...meetings, meeting])
      setActionItems([...actionItems, ...resolvedActionItems])
    } catch (err) {
      setError('Something went wrong reading that file. Try a .txt, .md, or .docx file.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="transcript-uploader">
        <div className="upload-dropzone">
          <div className="upload-card">
            <div className="upload-icon-square" aria-hidden="true">
              <svg className="upload-icon-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 34c0-6.6 5.4-12 12-12 2.8 0 5.3 1 7.2 2.8 1.7-3.3 5.1-5.5 8.9-5.5 5.5 0 10 4.5 10 10 0 .8-.1 1.6-.3 2.4 3.1 1.1 5.3 4.1 5.3 7.6 0 4.4-3.6 8-8 8H18c-4.4 0-8-3.6-8-8 0-3.7 2.5-6.8 6-7.7.1-.7.2-1.4.2-2.1Z" fill="currentColor" />
                <path d="M32 22v14" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M25 29l7-7 7 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="upload-center">
              <p>Upload a transcript</p>
              <span className="upload-hint">Drop a .txt, .md, or .docx file here, or choose one.</span>
              <label className={`btn btn-primary upload-button ${isLoading ? 'is-loading' : ''}`}>
                {isLoading ? <LoadingSpinner /> : 'Select file'}
                <input
                  type="file"
                  accept=".txt,.md,.docx"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="upload-error">{error}</p>}
    </div>
  )
}

export default TranscriptUploader