import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Users, 
  Globe, 
  Database,
  Save,
  X,
  Check,
  ChevronRight,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import './Settings.css';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('general');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dataRefreshInterval, setDataRefreshInterval] = useState('5');
  const [apiKey, setApiKey] = useState('sk_live_T4NLsJf7FfQj9t4u2M81Kj5E9wBhT7R2');
  const [showApiKey, setShowApiKey] = useState(false);
  
  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: <SettingsIcon size={20} />,
      description: 'Configure system-wide settings and preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} />,
      description: 'Configure how and when you receive alerts and updates'
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Shield size={20} />,
      description: 'Manage access controls and data protection settings'
    },
    {
      id: 'users',
      title: 'Users & Permissions',
      icon: <Users size={20} />,
      description: 'Manage team members and their access rights'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: <Globe size={20} />,
      description: 'Connect with external systems and services'
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: <Database size={20} />,
      description: 'Configure data retention and backup policies'
    }
  ];
  
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="settings-panel">
            <h2 className="panel-title">General Settings</h2>
            <p className="panel-description">Configure system-wide settings and preferences</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label className="form-label">System Name</label>
                <input type="text" className="form-input" defaultValue="RetailReboot Supply Chain" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Data Refresh Interval (minutes)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={dataRefreshInterval} 
                  onChange={(e) => setDataRefreshInterval(e.target.value)}
                  min="1"
                  max="60"
                />
                <p className="form-help">How frequently data is updated from all connected systems</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Time Zone</label>
                <select className="form-select" defaultValue="America/New_York">
                  <option value="America/New_York">Eastern Time (ET) - New York</option>
                  <option value="America/Chicago">Central Time (CT) - Chicago</option>
                  <option value="America/Denver">Mountain Time (MT) - Denver</option>
                  <option value="America/Los_Angeles">Pacific Time (PT) - Los Angeles</option>
                  <option value="UTC">Coordinated Universal Time (UTC)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Default Dashboard</label>
                <select className="form-select" defaultValue="supply-chain">
                  <option value="supply-chain">Supply Chain Command Center</option>
                  <option value="analytics">Analytics Dashboard</option>
                  <option value="inventory">Inventory Overview</option>
                  <option value="logistics">Logistics Tracker</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button className="btn-primary">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button className="btn-secondary">
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="settings-panel">
            <h2 className="panel-title">Notification Settings</h2>
            <p className="panel-description">Configure how and when you receive alerts and updates</p>
            
            <div className="settings-form">
              <div className="toggle-group">
                <div className="toggle-label">
                  <span>Enable all notifications</span>
                </div>
                <div className="toggle-control">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className={`nested-settings ${notificationsEnabled ? '' : 'disabled'}`}>
                <div className="toggle-group">
                  <div className="toggle-label">
                    <span>Email alerts</span>
                    <span className="toggle-description">Receive critical alerts via email</span>
                  </div>
                  <div className="toggle-control">
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={emailAlerts}
                        onChange={() => setEmailAlerts(!emailAlerts)}
                        disabled={!notificationsEnabled}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="toggle-group">
                  <div className="toggle-label">
                    <span>Push notifications</span>
                    <span className="toggle-description">Receive alerts in your browser or mobile app</span>
                  </div>
                  <div className="toggle-control">
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={pushNotifications}
                        onChange={() => setPushNotifications(!pushNotifications)}
                        disabled={!notificationsEnabled}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Notification Priority Level</label>
                  <select className="form-select" defaultValue="high" disabled={!notificationsEnabled}>
                    <option value="all">All (including informational)</option>
                    <option value="medium">Medium priority and above</option>
                    <option value="high">High priority only</option>
                    <option value="critical">Critical alerts only</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Recipients</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="admin@retailreboot.com, alerts@retailreboot.com" 
                    disabled={!notificationsEnabled || !emailAlerts}
                  />
                  <p className="form-help">Separate multiple email addresses with commas</p>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="btn-primary">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button className="btn-secondary">
                  <RefreshCw size={16} />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="settings-panel">
            <h2 className="panel-title">Security & Privacy Settings</h2>
            <p className="panel-description">Manage access controls and data protection settings</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label className="form-label">API Security Key</label>
                <div className="api-key-input">
                  <input 
                    type={showApiKey ? "text" : "password"} 
                    className="form-input" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    readOnly
                  />
                  <button 
                    className="toggle-visibility-btn"
                    onClick={() => setShowApiKey(!showApiKey)}
                    title={showApiKey ? "Hide API key" : "Show API key"}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="key-actions">
                  <button className="btn-sm">Copy</button>
                  <button className="btn-sm">Regenerate</button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Two-Factor Authentication</label>
                <div className="toggle-group inline">
                  <div className="toggle-label">
                    <span>Require for all users</span>
                  </div>
                  <div className="toggle-control">
                    <label className="toggle">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Session Timeout</label>
                <select className="form-select" defaultValue="30">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                </select>
                <p className="form-help">Users will be automatically logged out after this period of inactivity</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">IP Restrictions</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Enter allowed IP addresses, one per line"
                  defaultValue="192.168.1.0/24&#10;10.0.0.5&#10;203.0.113.0/24"
                ></textarea>
                <p className="form-help">Leave blank to allow access from any IP address</p>
              </div>
              
              <div className="form-actions">
                <button className="btn-primary">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button className="btn-secondary">
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'users':
        return (
          <div className="settings-panel">
            <h2 className="panel-title">Users & Permissions</h2>
            <p className="panel-description">Manage team members and their access rights</p>
            
            <div className="panel-actions">
              <button className="btn-primary">
                <Users size={16} />
                <span>Add New User</span>
              </button>
            </div>
            
            <div className="users-table">
              <div className="table-header">
                <div className="user-col user-name-col">User</div>
                <div className="user-col user-role-col">Role</div>
                <div className="user-col user-status-col">Status</div>
                <div className="user-col user-last-login-col">Last Login</div>
                <div className="user-col user-actions-col">Actions</div>
              </div>
              
              <div className="table-body">
                <div className="user-row">
                  <div className="user-col user-name-col">
                    <div className="user-info">
                      <div className="user-avatar">AM</div>
                      <div>
                        <div className="user-name">Alex Morgan</div>
                        <div className="user-email">alex.morgan@retailreboot.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="user-col user-role-col">Administrator</div>
                  <div className="user-col user-status-col">
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="user-col user-last-login-col">Today, 9:42 AM</div>
                  <div className="user-col user-actions-col">
                    <div className="row-actions">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn">Permissions</button>
                    </div>
                  </div>
                </div>
                
                <div className="user-row">
                  <div className="user-col user-name-col">
                    <div className="user-info">
                      <div className="user-avatar">JC</div>
                      <div>
                        <div className="user-name">Jamie Chen</div>
                        <div className="user-email">jamie.chen@retailreboot.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="user-col user-role-col">Supply Chain Manager</div>
                  <div className="user-col user-status-col">
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="user-col user-last-login-col">Yesterday, 4:15 PM</div>
                  <div className="user-col user-actions-col">
                    <div className="row-actions">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn">Permissions</button>
                    </div>
                  </div>
                </div>
                
                <div className="user-row">
                  <div className="user-col user-name-col">
                    <div className="user-info">
                      <div className="user-avatar">SW</div>
                      <div>
                        <div className="user-name">Sarah Williams</div>
                        <div className="user-email">sarah.williams@retailreboot.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="user-col user-role-col">Analyst</div>
                  <div className="user-col user-status-col">
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="user-col user-last-login-col">Jun 20, 2025</div>
                  <div className="user-col user-actions-col">
                    <div className="row-actions">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn">Permissions</button>
                    </div>
                  </div>
                </div>
                
                <div className="user-row">
                  <div className="user-col user-name-col">
                    <div className="user-info">
                      <div className="user-avatar">CR</div>
                      <div>
                        <div className="user-name">Carlos Rodriguez</div>
                        <div className="user-email">carlos.rodriguez@retailreboot.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="user-col user-role-col">Warehouse Manager</div>
                  <div className="user-col user-status-col">
                    <span className="status-badge inactive">Inactive</span>
                  </div>
                  <div className="user-col user-last-login-col">Jun 15, 2025</div>
                  <div className="user-col user-actions-col">
                    <div className="row-actions">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn">Permissions</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'integrations':
        return (
          <div className="settings-panel">
            <h2 className="panel-title">Integrations</h2>
            <p className="panel-description">Connect with external systems and services</p>
            
            <div className="integrations-grid">
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-logo">ERP</div>
                  <div className="integration-status connected">
                    <Check size={14} />
                    <span>Connected</span>
                  </div>
                </div>
                <h3 className="integration-title">Enterprise Resource Planning</h3>
                <p className="integration-description">
                  Connect to your ERP system to synchronize inventory, orders, and financial data.
                </p>
                <div className="integration-footer">
                  <button className="integration-btn">Configure</button>
                  <button className="integration-btn">Disconnect</button>
                </div>
              </div>
              
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-logo">WMS</div>
                  <div className="integration-status connected">
                    <Check size={14} />
                    <span>Connected</span>
                  </div>
                </div>
                <h3 className="integration-title">Warehouse Management System</h3>
                <p className="integration-description">
                  Integrate with your WMS to track inventory movements and warehouse operations.
                </p>
                <div className="integration-footer">
                  <button className="integration-btn">Configure</button>
                  <button className="integration-btn">Disconnect</button>
                </div>
              </div>
              
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-logo">TMS</div>
                  <div className="integration-status not-connected">
                    <X size={14} />
                    <span>Not Connected</span>
                  </div>
                </div>
                <h3 className="integration-title">Transportation Management System</h3>
                <p className="integration-description">
                  Connect to your TMS to track shipments, optimize routes, and monitor deliveries.
                </p>
                <div className="integration-footer">
                  <button className="integration-btn primary">Connect</button>
                </div>
              </div>
              
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-logo">IoT</div>
                  <div className="integration-status connected">
                    <Check size={14} />
                    <span>Connected</span>
                  </div>
                </div>
                <h3 className="integration-title">IoT Platform</h3>
                <p className="integration-description">
                  Integrate with IoT sensors for real-time monitoring of goods and equipment.
                </p>
                <div className="integration-footer">
                  <button className="integration-btn">Configure</button>
                  <button className="integration-btn">Disconnect</button>
                </div>
              </div>
              
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-logo">API</div>
                  <div className="integration-status not-connected">
                    <X size={14} />
                    <span>Not Connected</span>
                  </div>
                </div>
                <h3 className="integration-title">Third-Party API Gateway</h3>
                <p className="integration-description">
                  Connect to external APIs for weather data, traffic conditions, and market insights.
                </p>
                <div className="integration-footer">
                  <button className="integration-btn primary">Connect</button>
                </div>
              </div>
              
              <div className="integration-card add-new">
                <div className="add-integration">
                  <div className="add-icon">+</div>
                  <h3 className="add-title">Add New Integration</h3>
                  <p className="add-description">
                    Browse our integration marketplace or set up a custom connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'data':
        return (
          <div className="settings-panel">
            <h2 className="panel-title">Data Management</h2>
            <p className="panel-description">Configure data retention and backup policies</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label className="form-label">Data Retention Period</label>
                <select className="form-select" defaultValue="365">
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">6 months</option>
                  <option value="365">1 year</option>
                  <option value="730">2 years</option>
                  <option value="1825">5 years</option>
                </select>
                <p className="form-help">Historical data older than this will be archived</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Automated Backup Schedule</label>
                <select className="form-select" defaultValue="daily">
                  <option value="hourly">Every hour</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Backup Retention</label>
                <div className="multi-input-group">
                  <div className="input-group">
                    <label className="input-label">Daily backups</label>
                    <input type="number" className="form-input small" defaultValue="7" min="1" max="30" />
                    <span className="input-suffix">days</span>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Weekly backups</label>
                    <input type="number" className="form-input small" defaultValue="4" min="1" max="52" />
                    <span className="input-suffix">weeks</span>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Monthly backups</label>
                    <input type="number" className="form-input small" defaultValue="12" min="1" max="60" />
                    <span className="input-suffix">months</span>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Data Export Format</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked={true} />
                    <span>CSV</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked={true} />
                    <span>JSON</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked={false} />
                    <span>XML</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked={true} />
                    <span>Excel</span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="btn-primary">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button className="btn-secondary">
                  <RefreshCw size={16} />
                  <span>Reset to Default</span>
                </button>
              </div>
              
              <div className="danger-zone">
                <h3 className="danger-title">Danger Zone</h3>
                <div className="danger-actions">
                  <div className="danger-action">
                    <div>
                      <h4 className="danger-action-title">Export All Data</h4>
                      <p className="danger-action-desc">Download a complete backup of all system data</p>
                    </div>
                    <button className="btn-secondary">Export</button>
                  </div>
                  <div className="danger-action">
                    <div>
                      <h4 className="danger-action-title">Clear All Data</h4>
                      <p className="danger-action-desc">Permanently erase all data from the system</p>
                    </div>
                    <button className="btn-danger">Clear Data</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a settings category</div>;
    }
  };
  
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">
          Configure your supply chain platform settings and preferences
        </p>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <ul className="settings-nav-list">
              {sections.map((section) => (
                <li 
                  key={section.id} 
                  className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => handleSectionChange(section.id)}
                >
                  <div className="nav-item-icon">{section.icon}</div>
                  <div className="nav-item-content">
                    <span className="nav-item-title">{section.title}</span>
                    <span className="nav-item-description">{section.description}</span>
                  </div>
                  <ChevronRight size={16} className="nav-item-arrow" />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="settings-content">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Settings;