// components/features/action-items/ActionItemRow.jsx
import React from 'react'
import Badge from '../../ui/Badge'
import { useMeetingsContext } from '../../../context/MeetingContext'

const STATUS_OPTIONS = ['open', 'done', 'overdue']

const ActionItemRow = ({ item }) => {
  const { people, updateActionItemStatus } = useMeetingsContext()
  const assignee = people.find((p) => p.id === item.assigneeId)

  return (
    <div className="action-item-row">
      <span>{item.task}</span>
      <span>{assignee?.name}</span>
      <span>{item.dueDate}</span>
      <Badge status={item.status} />
      <select
        className="status-select"
        value={item.status}
        onChange={(e) => updateActionItemStatus(item.id, e.target.value)}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ActionItemRow