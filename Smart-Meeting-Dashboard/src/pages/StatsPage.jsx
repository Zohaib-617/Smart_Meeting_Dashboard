// pages/StatsPage.jsx
import React from 'react'
import { useMeetingsContext } from '../context/MeetingContext'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'


const EVENT_LEVELS = { Uploaded: 4, Edited: 3, 'Status changed': 2, Deleted: 1 }
const EVENT_COLORS = {
  Uploaded: '#2563EB',
  Edited: '#D97706',
  'Status changed': '#16A34A',
  Deleted: '#DC2626',
}

const formatDateTime = (timestamp) => {
  const d = new Date(timestamp)
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null
  const point = payload[0].payload

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '13px',
      }}
    >
      <div style={{ fontWeight: 500 }}>{point.title}</div>
      <div style={{ color: 'var(--color-secondary)' }}>
        {point.type} · {formatDateTime(point.time)}
      </div>
    </div>
  )
}

const StatsPage = () => {
  const { meetings, deletedLog, statusLog } = useMeetingsContext()
  const uploaded = meetings.filter((m) => m.source === 'uploaded')

  const events = []

  uploaded.forEach((m) => {
    if (m.createdAt) {
      events.push({ type: 'Uploaded', title: m.title, time: new Date(m.createdAt).getTime() })
    }
    if (m.updatedAt) {
      events.push({ type: 'Edited', title: m.title, time: new Date(m.updatedAt).getTime() })
    }
  })

  deletedLog.forEach((entry) => {
    events.push({ type: 'Deleted', title: entry.title, time: new Date(entry.deletedAt).getTime() })
  })

  statusLog.forEach((entry) => {
    events.push({
      type: 'Status changed',
      title: `${entry.meetingTitle} — ${entry.task} → ${entry.newStatus}`,
      time: new Date(entry.changedAt).getTime(),
    })
  })

  const chartData = events.map((e) => ({ ...e, level: EVENT_LEVELS[e.type] }))
  const eventTypes = ['Uploaded', 'Edited', 'Status changed', 'Deleted']

  return (
    <div>
      <h2>Meeting activity over time</h2>
      {chartData.length === 0 ? (
        <p style={{ color: 'var(--color-secondary)' }}>
          No activity yet. Upload a transcript to see activity here.
        </p>
      ) : (
        <div className="card" style={{ height: '360px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="time"
                type="number"
                domain={['dataMin - 3600000', 'dataMax + 3600000']}
                tickFormatter={formatDateTime}
                fontSize={11}
              />
              <YAxis
                dataKey="level"
                type="number"
                domain={[0, 5]}
                ticks={[1, 2, 3, 4]}
                tickFormatter={(value) =>
                  Object.keys(EVENT_LEVELS).find((key) => EVENT_LEVELS[key] === value) || ''
                }
                fontSize={12}
                width={100}
              />
              <ZAxis range={[80, 80]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {eventTypes.map((type) => (
                <Scatter
                  key={type}
                  name={type}
                  data={chartData.filter((d) => d.type === type)}
                  fill={EVENT_COLORS[type]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default StatsPage