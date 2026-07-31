// services/transcriptParser.js
const NON_SPEAKER_LABELS = ['action', 'todo', 'decision', 'summary', 'note']

export const parseTranscript = (rawText) => {
  const lines = rawText.trim().split('\n')
  const title = lines[0] || 'Untitled meeting'
  const body = lines.slice(1).join('\n')

  const speakerNames = []
  const speakerPattern = /(?:^|\s)([A-Z][a-zA-Z]*):/g
  let match

  while ((match = speakerPattern.exec(body)) !== null) {
    const name = match[1].trim()
    const isLabel = NON_SPEAKER_LABELS.includes(name.toLowerCase())
    const alreadyFound = speakerNames.some((s) => s.toLowerCase() === name.toLowerCase())
    if (!isLabel && !alreadyFound) {
      speakerNames.push(name)
    }
  }

  return {
    id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    date: new Date().toISOString().slice(0, 10),
    team: 'Unassigned',
    participantIds: [],
    speakerNames,
    transcript: body,
    source: 'uploaded',
    createdAt: new Date().toISOString(),
  }
}