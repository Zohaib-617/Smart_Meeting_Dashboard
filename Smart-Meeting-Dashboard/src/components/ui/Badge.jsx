// Badge.jsx
import React from 'react'

const STATUS_LABELS = {
  open: "Open",
  "in-progress": "In progress",
  done: "Done",
  overdue: "Overdue",
}

const Badge = ({ status }) => {
  return (
    <span className={`badge badge-${status}`}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}

export default Badge