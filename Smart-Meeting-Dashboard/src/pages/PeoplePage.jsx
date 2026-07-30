// pages/PeoplePage.jsx
import React from 'react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useMeetingsContext } from '../context/MeetingContext'

const initials = (name) =>
  name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

const PeoplePage = () => {
  const { meetings, people, actionItems } = useMeetingsContext()

  return (
    <div>
      <h2>People</h2>
      <div className="people-meetings-list">
        {meetings.map((meeting) => {
          const participants = meeting.participantIds
            .map((id) => people.find((p) => p.id === id))
            .filter(Boolean)

          return (
            <Card key={meeting.id}>
              <div className="people-meeting-header">
                <span style={{ fontWeight: 500 }}>{meeting.title}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>
                  {meeting.date}
                </span>
              </div>

              {participants.length === 0 && (
                <p style={{ fontSize: '13px', color: 'var(--color-secondary)' }}>
                  No participants recorded for this meeting.
                </p>
              )}

              {participants.map((person) => {
                const tasks = actionItems.filter(
                  (item) => item.meetingId === meeting.id && item.assigneeId === person.id
                )

                return (
                  <div key={person.id} className="people-person-row">
                    <div className="avatar">{initials(person.name)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{person.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>
                        {person.team}
                      </div>
                    </div>
                    <div className="people-person-tasks">
                      {tasks.length === 0 ? (
                        <span style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>
                          No tasks assigned
                        </span>
                      ) : (
                        tasks.map((task) => (
                          <div key={task.id} className="people-task-item">
                            <span>{task.task}</span>
                            <Badge status={task.status} />
                          </div>
                        ))
                      )}
                    </div>
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

export default PeoplePage