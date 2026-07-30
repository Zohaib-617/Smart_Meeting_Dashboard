// services/transcriptParser.js
const NON_SPEAKER_LABELS = ['action', 'todo', 'decision', 'summary', 'note']

export const parseTranscript = (rawText) => {
  const lines = rawText.trim().split('\n')
  const title = lines[0] || 'Untitled meeting'
  const body = lines.slice(1).join('\n')

  const speakerNames = []
  lines.forEach((line) => {
    const match = line.match(/^([A-Za-z][A-Za-z]*):/)
    if (match) {
      const name = match[1].trim()
      if (!NON_SPEAKER_LABELS.includes(name.toLowerCase()) && !speakerNames.includes(name)) {
        speakerNames.push(name)
      }
    }
  })

  return {
    id: `m-${Date.now()}`,
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