// components/layout/Topbar.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sun, Moon } from 'lucide-react'
import { useMeetingsContext } from '../../context/MeetingContext'
import { useTheme } from '../../hooks/useTheme'

const Topbar = () => {
  const { searchQuery, setSearchQuery } = useMeetingsContext()
  const { theme, toggleTheme } = useTheme()
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
      <div className="topbar-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div className="avatar">U</div>
      </div>
    </div>
  )
}

export default Topbar