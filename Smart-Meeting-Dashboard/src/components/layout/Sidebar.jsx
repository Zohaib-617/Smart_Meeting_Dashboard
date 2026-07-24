// components/layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Upload', path: '/upload' },
    { label: 'All meetings', path: '/meetings' },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Meeting Notes</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'nav-item nav-item-active' : 'nav-item'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar