// services/summarize.js
export const summarizeMeeting = (meeting, decisions) => {
  if (decisions.length === 0) {
    return 'No clear decisions were identified in this transcript.'
  }

  const points = decisions.map((d) => d.text).join(' ')
  return `Key points from this meeting: ${points}`
}