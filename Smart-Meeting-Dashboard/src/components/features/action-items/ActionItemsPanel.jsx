// action-items/ActionItemsPanel.jsx
import React from 'react'
import ActionItemRow from './ActionItemRow'
import EmptyState from '../../ui/EmptyState'
import  useActionItems  from '../../../hooks/useActionItems'

const ActionItemsPanel = ({ meetingId }) => {
  const actionItems = useActionItems({ meetingId })

  if (!actionItems || actionItems.length === 0) {
    return <EmptyState message="No action items for this meeting." />
  }

  return (
    <div className="action-items-panel">
      {actionItems.map((item) => (
        <ActionItemRow key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ActionItemsPanel