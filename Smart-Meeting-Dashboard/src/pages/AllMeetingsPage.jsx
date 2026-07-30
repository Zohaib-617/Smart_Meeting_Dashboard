// pages/AllMeetingsPage.jsx
import React, { useState, useMemo } from 'react'
import MeetingList from '../components/features/meeting/MeetingList'
import { useMeetingsContext } from '../context/MeetingContext'

const AllMeetingsPage = () => {
  const { meetings, setSelectedMeetingId } = useMeetingsContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTeam, setActiveTeam] = useState(null)
  const [newTag, setNewTag] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [customTags, setCustomTags] = useState([])

  const existingTeams = useMemo(
    () => Array.from(new Set(meetings.map((m) => m.team).filter(Boolean))),
    [meetings]
  )
  const allTags = Array.from(new Set([...existingTeams, ...customTags]))

  const handleAddTag = () => {
    const trimmed = newTag.trim()
    if (trimmed && !allTags.includes(trimmed)) {
      setCustomTags([...customTags, trimmed])
    }
    setNewTag('')
    setIsAddingTag(false)
  }

  const filteredMeetings = meetings.filter((m) => {
    const matchesQuery = !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTeam = !activeTeam || m.team === activeTeam
    return matchesQuery && matchesTeam
  })

  return (
    <div>
      <input
        type="text"
        className="all-meetings-search"
        placeholder="Search meetings"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="team-tags-row">
        {allTags.map((team) => (
          <button
            key={team}
            className={team === activeTeam ? 'team-tag team-tag-active' : 'team-tag'}
            onClick={() => setActiveTeam(team === activeTeam ? null : team)}
          >
            {team}
          </button>
        ))}

        {isAddingTag ? (
          <span className="team-tag-add-input">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Team name"
              autoFocus
            />
            <button onClick={handleAddTag}>Add</button>
          </span>
        ) : (
          <button className="team-tag team-tag-ghost" onClick={() => setIsAddingTag(true)}>
            + Add tag
          </button>
        )}
      </div>

      <h2>All meetings</h2>
      <MeetingList meetings={filteredMeetings} onSelectMeeting={setSelectedMeetingId} />
    </div>
  )
}

export default AllMeetingsPage