// EmptyState.jsx
import React from 'react'

const EmptyState = ({ message, actionLabel, onAction }) => {
  return (
    <div className="empty-state">
      <p>{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  )
}

export default EmptyState