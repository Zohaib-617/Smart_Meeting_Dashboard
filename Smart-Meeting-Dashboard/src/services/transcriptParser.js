// services/transcriptParser.js
export const parseTranscript = (rawText) => {
  const lines = rawText.trim().split('\n')
  const title = lines[0] || 'Untitled meeting'
  const body = lines.slice(1).join('\n')

  return {
    id: `m-${Date.now()}`,
    title,
    date: new Date().toISOString().slice(0, 10),
    team: 'Unassigned',
    participantIds: [],
    transcript: body,
  }
}