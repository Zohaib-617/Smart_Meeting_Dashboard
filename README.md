# Smart Meeting Notes Dashboard

A React dashboard for uploading meeting transcripts and automatically surfacing decisions, action items, and summaries — built to make it easy to search past meetings, track who owns what, and see decision history across a team.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-charts-8884d8)

## Overview

Teams generate a lot of meeting transcripts and very little structure around them. This dashboard takes a raw `.txt` transcript and turns it into something usable: who was in the meeting, what was decided, what got assigned to whom, and a running history of activity across the workspace — searchable, filterable, and visualized.

## Features

- **Transcript upload** — drag-and-drop or file picker for `.txt` transcripts, with loading and error states
- **Automatic extraction** — pulls out participants, decisions, and action items from the raw transcript text (rule-based; see [Extraction approach](#extraction-approach) below)
- **Search and filtering** — full-text search across meetings, plus team-based tag filtering on the All Meetings page
- **Action item tracking** — a dedicated view grouping every open action item by meeting and assignee, so nothing gets lost in a transcript
- **People view** — see every meeting a person attended and every task assigned to them, in one place
- **Activity timeline** — a chart of when meetings were uploaded, edited, or deleted, plotted by exact timestamp
- **Meeting management** — edit a meeting's details (including reassigning participants to different teams) or delete it, with a confirmation dialog before anything destructive happens
- **Persistent storage** — uploaded meetings, edits, and deletions survive a page reload via `localStorage`
- **Responsive layout** — a collapsible sidebar and a layout that adapts down to mobile widths

## Tech stack

- **React 18** + **Vite** for the build tooling
- **React Router** for client-side routing
- **React Context + custom hooks** for state management (no external state library — deliberately, to demonstrate the pattern directly)
- **Recharts** for the activity timeline chart
- **Lucide React** for icons
- **Vitest** for unit tests


```

## Project structure

```
src/
├── data/            Mock data used as a fallback before real uploads exist
├── context/          Global state (MeetingsContext)
├── hooks/            Derived/filtered data logic (useFilteredMeetings, useActionItems)
├── services/          Non-UI logic: transcript parsing, insight extraction, summarization
├── components/
│   ├── ui/            Reusable, domain-agnostic components (Button, Card, Modal, Badge...)
│   ├── layout/        Sidebar and Topbar
│   └── features/      Domain-specific components, grouped by feature
├── pages/            Route-level views (Dashboard, All Meetings, Action Items, People, Stats)
└── tests/            Unit tests for parsing and filtering logic
```

The architecture is layered deliberately: `data/` has no dependencies on anything else, `context/` and `hooks/` depend only on `data/`, `components/ui/` depends on nothing but React, and `components/features/` is the only layer that composes both UI primitives and shared state. This keeps each layer independently testable and swappable.

## Extraction approach

Decision and action-item extraction currently works by matching a small set of keyword patterns (`decided`, `agreed to`, `action:`, `will do`, `assigned to`, and a `Name: will ...` pattern for identifying an assignee). This is an honest, working first version — it correctly handles transcripts phrased in those terms, but won't catch decisions or tasks phrased differently, since it isn't doing real language understanding.

**Planned improvement:** replace the rule-based extraction in `services/extractInsights.js` with an LLM-based call that reads the full transcript and returns structured decisions/action items/summary — this would remove the dependency on specific phrasing entirely.

## Known limitations

- Editing a meeting's transcript does not automatically re-run extraction — decisions and action items stay as originally extracted unless you hit "Regenerate" on the summary or manually re-upload
- New people created from an uploaded transcript default to an "Unassigned" team until manually edited
- `localStorage` persistence is permanent by design — there's no automatic reset; clearing it requires `localStorage.clear()` in the browser console

