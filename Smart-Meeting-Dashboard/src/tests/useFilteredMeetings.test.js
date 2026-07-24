// tests/useFilteredMeetings.test.js
// Note: testing a hook that reads from context requires rendering it inside
// a provider — this needs @testing-library/react and @testing-library/react-hooks
// style setup. A simpler first version: extract the actual filtering logic
// into a plain function you can test directly, e.g.:

import { describe, it, expect } from 'vitest'

const filterMeetings = (meetings, query, filters) => {
  return meetings.filter((m) => {
    const matchesQuery = !query || m.title.toLowerCase().includes(query.toLowerCase())
    const matchesTeam = !filters.team || m.team === filters.team
    return matchesQuery && matchesTeam
  })
}

describe('filterMeetings', () => {
  const meetings = [
    { title: 'Q3 roadmap sync', team: 'Product' },
    { title: 'Engineering all-hands', team: 'Engineering' },
  ]

  it('filters by search query', () => {
    const result = filterMeetings(meetings, 'roadmap', {})
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Q3 roadmap sync')
  })

  it('filters by team', () => {
    const result = filterMeetings(meetings, '', { team: 'Engineering' })
    expect(result).toHaveLength(1)
    expect(result[0].team).toBe('Engineering')
  })

  it('returns everything when no filters are active', () => {
    const result = filterMeetings(meetings, '', {})
    expect(result).toHaveLength(2)
  })
})