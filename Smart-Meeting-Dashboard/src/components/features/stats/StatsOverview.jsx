// stats/StatsOverview.jsx
import React from 'react'
import Card from '../../ui/Card'
import { useMeetingsContext } from '../../../context/MeetingContext'
const StatsOverview = () => {
  const { meetings, actionItems } = useMeetingsContext()
  const openItems = actionItems.filter((item) => item.status === 'open').length

  return (
    <div className="stats-overview">
      <Card>
        <p>Meetings</p>
        <h2>{meetings.length}</h2>
      </Card>
      <Card>
        <p>Open items</p>
        <h2>{openItems}</h2>
      </Card>
    </div>
  )
}

export default StatsOverview