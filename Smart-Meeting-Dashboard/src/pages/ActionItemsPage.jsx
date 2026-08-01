// pages/ActionItemsPage.jsx
import React from 'react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useMeetingsContext } from '../context/MeetingContext'

const initials = (name) =>
  name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

const STATUS_OPTIONS = ['open', 'done', 'overdue']

const ActionItemsPage = () => {
  const { meetings, people, actionItems, updateActionItemStatus } = useMeetingsContext()

  const uploadedMeetings = meetings.filter((m) => m.source === 'uploaded')
  const relevantMeetings = uploadedMeetings.filter((m) =>
    actionItems.some((item) => item.meetingId === m.id)
  )

  if (relevantMeetings.length === 0) {
    return (
      <div>
        <h2>Action items</h2>
        <p style={{ color: 'var(--color-secondary)' }}>
          No action items yet. Upload a transcript to see action items here.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Action items</h2>
      <div className="people-meetings-list">
        {relevantMeetings.map((meeting) => {
          const items = actionItems.filter((item) => item.meetingId === meeting.id)

          return (
            <Card key={meeting.id}>
              <div className="people-meeting-header">
                <span style={{ fontWeight: 500 }}>{meeting.title}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>
                  {meeting.date}
                </span>
              </div>

              {items.map((item) => {
                const assignee = people.find((p) => p.id === item.assigneeId)
                return (
                  <div key={item.id} className="people-person-row">
                    <div className="avatar">{assignee ? initials(assignee.name) : '?'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{item.task}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>
                        {assignee ? assignee.name : 'Unassigned'}
                      </div>
                    </div>
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
              })}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ActionItemsPage