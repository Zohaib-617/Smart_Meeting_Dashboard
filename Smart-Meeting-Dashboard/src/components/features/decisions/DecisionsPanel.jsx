// decisions/DecisionsPanel.jsx
import React from 'react'

const DecisionsPanel = ({ meeting }) => {
  if (!meeting.decisions || meeting.decisions.length === 0) {
    return <p>No decisions recorded for this meeting.</p>
  }

  return (
    <ul className="decisions-panel">
      {meeting.decisions.map((decision) => (
        <li key={decision.id}>{decision.text}</li>
      ))}
    </ul>
  )
}

export default DecisionsPanel