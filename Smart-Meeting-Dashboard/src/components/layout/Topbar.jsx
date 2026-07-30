// components/layout/Topbar.jsx
import React from 'react'

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-search">
        <input type="text" placeholder="Search transcripts" />
      </div>
      <div className="topbar-user">
        <div className="avatar">U</div>
      </div>
    </div>
  )
}

export default Topbar