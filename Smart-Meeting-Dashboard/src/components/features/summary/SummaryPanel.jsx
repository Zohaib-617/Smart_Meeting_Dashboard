// summary/SummaryPanel.jsx
import React from 'react'
import Button from '../../ui/Button'

const SummaryPanel = ({ meeting, onRegenerate }) => {
  return (
    <div className="summary-panel">
      <p>{meeting.summary}</p>
      <Button variant="secondary" onClick={onRegenerate}>
        Regenerate
      </Button>
    </div>
  )
}

export default SummaryPanel