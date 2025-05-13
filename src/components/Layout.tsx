import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  BarChart, 
  Users, 
  Blocks, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search,
  User
} from 'lucide-react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/supply-chain-map', label: 'Supply Chain Map', icon: <Network size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart size={20} /> },
    { path: '/collaboration', label: 'Collaboration', icon: <Users size={20} /> },
    { path: '/blockchain', label: 'Blockchain', icon: <Blocks size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <div className="layout">
      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar}></div>
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">RetailReboot</h1>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <p>© 2025 RetailReboot</p>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          
          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="header-actions">
            <button className="header-action-btn notifications">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <User size={20} />
              <span className="user-name hide-on-mobile">Admin User</span>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;