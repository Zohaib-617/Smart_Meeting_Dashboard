// components/features/meetings/HistoryList.jsx
import React from 'react'
import { useMeetingsContext } from '../../../context/MeetingContext'

const HistoryList = ({ onSelectMeeting }) => {
  const { meetings } = useMeetingsContext()

  const sorted = [...meetings].sort((a, b) => new Date(b.date) - new Date(a.date))

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return {
      month: d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase(),
      day: d.getDate(),
    }
  }

  return (
    <div className="history-list">
      {sorted.map((meeting) => {
        const { month, day } = formatDate(meeting.date)
        return (
          <div
            key={meeting.id}
            className="history-item"
            onClick={() => onSelectMeeting(meeting.id)}
          >
            <div className="history-date">
              <div className="history-date-month">{month}</div>
              <div className="history-date-day">{day}</div>
            </div>
            <div className="history-item-info">
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{meeting.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>{meeting.team}</div>
            </div>
            <span className="tag">{meeting.team}</span>
          </div>
        )
      })}
    </div>
  )
}

export default HistoryList