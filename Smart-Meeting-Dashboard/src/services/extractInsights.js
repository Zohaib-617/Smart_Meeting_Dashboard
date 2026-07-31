// services/extractInsights.js
export const extractInsights = (meeting) => {
  const lines = meeting.transcript.split('\n')

  const decisions = lines
    .filter((line) => /decided|we'll go with|agreed to/i.test(line))
    .map((line, index) => ({
      id: `${meeting.id}-d${index}`,
      text: line.trim(),
    }))

  const actionItemLines = lines.filter((line) => /action:|todo:|will do|assigned to/i.test(line))

  const actionItems = actionItemLines.map((line, index) => {
    const assigneeMatch = line.match(/(?:action:|todo:)?\s*([A-Z][a-zA-Z]*)\s+will\b/i)
    const assigneeName = assigneeMatch ? assigneeMatch[1] : null

    return {
      id: `${meeting.id}-a${index}`,
      meetingId: meeting.id,
      task: line.trim(),
      assigneeName,
      assigneeId: null,
      dueDate: null,
      status: 'open',
    }
  })

  return { decisions, actionItems }
}