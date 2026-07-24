// action-items/ActionItemRow.jsx
import React from 'react'
import Badge from '../../ui/Badge'
import { useMeetingsContext } from '../../../context/MeetingContext'

const ActionItemRow = ({ item }) => {
  const { people } = useMeetingsContext()
  const assignee = people.find((p) => p.id === item.assigneeId)

  return (
    <div className="action-item-row">
      <span>{item.task}</span>
      <span>{assignee?.name}</span>
      <span>{item.dueDate}</span>
      <Badge status={item.status} />
    </div>
  )
}

export default ActionItemRow