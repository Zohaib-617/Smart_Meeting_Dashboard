// Sidebar.jsx
import React from 'react'

const Sidebar = ({ activeItem = "Dashboard" }) => {
  const navItems = ["Dashboard", "Upload", "All meetings"]

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Meeting Notes</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item}
            className={item === activeItem ? "nav-item nav-item-active" : "nav-item"}
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar