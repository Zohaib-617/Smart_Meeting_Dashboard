// components/features/dashboard/QuickActions.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Search, BarChart3, CheckSquare } from 'lucide-react'

const QuickActions = () => {
  const navigate = useNavigate()

  return (
    <div className="quick-actions">
      <button className="quick-action-card quick-action-upload" onClick={() => navigate('/upload')}>
        <Upload size={20} />
        <span>Upload transcript</span>
      </button>
      <button className="quick-action-card quick-action-search" onClick={() => document.querySelector('.topbar-search input')?.focus()}>
        <Search size={20} />
        <span>Search all meetings</span>
      </button>
      <button className="quick-action-card quick-action-stats" onClick={() => document.querySelector('.stats-overview')?.scrollIntoView({ behavior: 'smooth' })}>
        <BarChart3 size={20} />
        <span>View statistics</span>
      </button>
      <button className="quick-action-card quick-action-items" onClick={() => navigate('/action-items')}>
        <CheckSquare size={20} />
        <span>My action items</span>
      </button>
    </div>
  )
}

export default QuickActions