// components/layout/Topbar.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useMeetingsContext } from '../../context/MeetingContext'

const Topbar = () => {
  const { searchQuery, setSearchQuery } = useMeetingsContext()
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate('/meetings')
    }
  }

  return (
    <div className="topbar">
      <div className="mn-logo">MN</div>
      <div className="topbar-search">
        <Search size={16} className="topbar-search-icon" />
        <input
          type="text"
          placeholder="Search transcripts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />
      </div>
      <div className="topbar-user">
        <div className="avatar">U</div>
      </div>
    </div>
  )
}

export default Topbar