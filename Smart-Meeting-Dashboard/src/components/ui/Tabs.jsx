// Tabs.jsx
import React from 'react'

const Tabs = ({ tabs, activeTab, onChange, children }) => {
  return (
    <div className="tabs">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? "tab tab-active" : "tab"}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {children}
      </div>
    </div>
  )
}

export default Tabs