// components/layout/Sidebar.jsx
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, LayoutDashboard, Upload, List, CheckSquare, Users } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Upload', path: '/upload', icon: Upload },
    { label: 'All meetings', path: '/meetings', icon: List },
    { label: 'Action items', path: '/action-items', icon: CheckSquare },
    { label: 'People', path: '/people', icon: Users },
  ]

  const sidebarClass = [
    'sidebar',
    isCollapsed ? 'sidebar-collapsed' : '',
    isOpen ? 'sidebar-open' : 'sidebar-closed',
  ].join(' ').trim()

  return (
    <>
      <div className={sidebarClass}>
        <div className="sidebar-top">
          {!isCollapsed && <div className="sidebar-logo">Meeting Notes</div>}
          <button
            className="sidebar-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'nav-item nav-item-active' : 'nav-item'
                }
                title={isCollapsed ? item.label : undefined}
                onClick={onClose}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>
      </div>
      <div
        className={isOpen ? 'sidebar-backdrop sidebar-backdrop-visible' : 'sidebar-backdrop'}
        onClick={onClose}
      />
    </>
  )
}

export default Sidebar