// search/FilterPanel.jsx
import React from 'react'
import { useMeetingsContext } from '../../../context/MeetingContext'

const FilterPanel = () => {
  const { activeFilters, setActiveFilters } = useMeetingsContext()

  const handleTeamChange = (e) => {
    setActiveFilters({ ...activeFilters, team: e.target.value })
  }

  return (
    <div className="filter-panel">
      <select value={activeFilters.team || ''} onChange={handleTeamChange}>
        <option value="">All teams</option>
        <option value="Product">Product</option>
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Support">Support</option>
      </select>
    </div>
  )
}

export default FilterPanel