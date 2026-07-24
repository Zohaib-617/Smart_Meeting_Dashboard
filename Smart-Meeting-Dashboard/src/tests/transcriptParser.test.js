// tests/transcriptParser.test.js
import { describe, it, expect } from 'vitest'
import { parseTranscript } from '../services/transcriptParser'

describe('parseTranscript', () => {
  it('uses the first line as the title', () => {
    const result = parseTranscript('Team sync\nWe discussed the roadmap.')
    expect(result.title).toBe('Team sync')
  })

  it('falls back to a default title when the input is empty', () => {
    const result = parseTranscript('')
    expect(result.title).toBe('Untitled meeting')
  })

  it('puts everything after the first line into the transcript body', () => {
    const result = parseTranscript('Title\nLine one\nLine two')
    expect(result.transcript).toBe('Line one\nLine two')
  })
})