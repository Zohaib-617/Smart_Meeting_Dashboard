// pages/StatsPage.jsx
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import { useMeetingsContext } from '../context/MeetingContext'

const StatsPage = () => {
  const { meetings } = useMeetingsContext()
  const uploaded = meetings.filter((m) => m.source === 'uploaded')

  const countsByDate = {}

  uploaded.forEach((m) => {
    if (m.createdAt) {
      const day = m.createdAt.slice(0, 10)
      countsByDate[day] = countsByDate[day] || { date: day, uploaded: 0, edited: 0 }
      countsByDate[day].uploaded += 1
    }
    if (m.updatedAt) {
      const day = m.updatedAt.slice(0, 10)
      countsByDate[day] = countsByDate[day] || { date: day, uploaded: 0, edited: 0 }
      countsByDate[day].edited += 1
    }
  })

  const chartData = Object.values(countsByDate).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div>
      <h2>Meeting activity over time</h2>
      {chartData.length === 0 ? (
        <p style={{ color: 'var(--color-secondary)' }}>
          No uploaded meetings yet. Upload a transcript to see activity here.
        </p>
      ) : (
        <div className="card" style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uploaded" stroke="#2563EB" name="Uploaded" strokeWidth={2} />
              <Line type="monotone" dataKey="edited" stroke="#D97706" name="Edited" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default StatsPage