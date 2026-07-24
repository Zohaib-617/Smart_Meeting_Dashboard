// search/SearchBar.jsx
import React from 'react'
import { useMeetingsContext } from '../../../context/MeetingContext'

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useMeetingsContext()

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search transcripts"
    />
  )
}

export default SearchBar