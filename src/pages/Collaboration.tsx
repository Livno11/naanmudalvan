import React, { useState } from 'react';
import { 
  Users, 
  User, 
  Building, 
  Truck, 
  MessageSquare, 
  FileText, 
  ClipboardCheck,
  Calendar,
  ChevronDown,
  Search,
  Plus,
  Check,
  XCircle,
  Filter
} from 'lucide-react';
import './Collaboration.css';

type CollaboratorType = 'internal' | 'supplier' | 'logistics' | 'retail';
type TaskStatus = 'pending' | 'inProgress' | 'completed' | 'delayed';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

interface Collaborator {
  id: string;
  name: string;
  role: string;
  type: CollaboratorType;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

interface Document {
  id: string;
  title: string;
  type: 'contract' | 'report' | 'plan' | 'invoice';
  uploadedBy: string;
  uploadDate: string;
  size: string;
}

const Collaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'tasks' | 'documents'>('team');
  const [activeTeamFilter, setActiveTeamFilter] = useState<CollaboratorType | 'all'>('all');
  const [activeTaskFilter, setActiveTaskFilter] = useState<TaskStatus | 'all'>('all');
  
  // Example data
  const collaborators: Collaborator[] = [
    { 
      id: '1', 
      name: 'Alex Morgan', 
      role: 'Supply Chain Manager', 
      type: 'internal', 
      status: 'online' 
    },
    { 
      id: '2', 
      name: 'Jamie Chen', 
      role: 'Inventory Specialist', 
      type: 'internal', 
      status: 'online' 
    },
    { 
      id: '3', 
      name: 'Techno Supplies Inc.', 
      role: 'Primary Supplier', 
      type: 'supplier', 
      status: 'online' 
    },
    { 
      id: '4', 
      name: 'Global Logistics Ltd.', 
      role: 'Transportation Partner', 
      type: 'logistics', 
      status: 'offline' 
    },
    { 
      id: '5', 
      name: 'Sarah Williams', 
      role: 'Demand Planner', 
      type: 'internal', 
      status: 'away' 
    },
    { 
      id: '6', 
      name: 'EastCoast Retailers', 
      role: 'Retail Partner', 
      type: 'retail', 
      status: 'online' 
    },
    { 
      id: '7', 
      name: 'QuickShip Partners', 
      role: 'Last-Mile Delivery', 
      type: 'logistics', 
      status: 'offline' 
    },
    { 
      id: '8', 
      name: 'Carlos Rodriguez', 
      role: 'Warehouse Manager', 
      type: 'internal', 
      status: 'online' 
    },
  ];
  
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Update inventory forecasting model',
      description: 'Integrate the new AI predictive modeling component into the existing inventory forecasting system',
      assignedTo: ['1', '2', '5'],
      status: 'inProgress',
      priority: 'high',
      dueDate: '2025-06-25'
    },
    {
      id: '2',
      title: 'Supplier quality review meeting',
      description: 'Quarterly review of supplier quality metrics and improvement plans',
      assignedTo: ['1', '3'],
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-06-30'
    },
    {
      id: '3',
      title: 'Optimize East Coast distribution routes',
      description: 'Review and optimize delivery routes for the East Coast region to reduce transportation costs',
      assignedTo: ['4', '7'],
      status: 'completed',
      priority: 'medium',
      dueDate: '2025-06-20'
    },
    {
      id: '4',
      title: 'Implement blockchain verification for premium product line',
      description: 'Set up the blockchain verification system for tracking premium products from source to consumer',
      assignedTo: ['1', '3', '6'],
      status: 'delayed',
      priority: 'urgent',
      dueDate: '2025-06-15'
    },
    {
      id: '5',
      title: 'Warehouse expansion planning',
      description: 'Develop plan for the upcoming warehouse expansion to accommodate holiday season inventory',
      assignedTo: ['8', '5'],
      status: 'inProgress',
      priority: 'high',
      dueDate: '2025-07-10'
    }
  ];
  
  const documents: Document[] = [
    {
      id: '1',
      title: 'Q2 2025 Supply Chain Performance Report',
      type: 'report',
      uploadedBy: 'Alex Morgan',
      uploadDate: '2025-06-18',
      size: '4.2 MB'
    },
    {
      id: '2',
      title: 'Supplier Agreement - Techno Supplies Inc.',
      type: 'contract',
      uploadedBy: 'Jamie Chen',
      uploadDate: '2025-06-15',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Logistics Optimization Strategy 2025-2026',
      type: 'plan',
      uploadedBy: 'Sarah Williams',
      uploadDate: '2025-06-12',
      size: '3.5 MB'
    },
    {
      id: '4',
      title: 'Transportation Services - Invoice #8832',
      type: 'invoice',
      uploadedBy: 'Global Logistics Ltd.',
      uploadDate: '2025-06-10',
      size: '0.9 MB'
    },
    {
      id: '5',
      title: 'Retail Distribution Agreement - EastCoast Retailers',
      type: 'contract',
      uploadedBy: 'Alex Morgan',
      uploadDate: '2025-06-05',
      size: '2.1 MB'
    }
  ];
  
  const getCollaboratorIcon = (type: CollaboratorType) => {
    switch (type) {
      case 'internal': return <User size={16} />;
      case 'supplier': return <Building size={16} />;
      case 'logistics': return <Truck size={16} />;
      case 'retail': return <Building size={16} />;
      default: return <User size={16} />;
    }
  };
  
  const getTaskStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge pending">Pending</span>;
      case 'inProgress':
        return <span className="status-badge in-progress">In Progress</span>;
      case 'completed':
        return <span className="status-badge completed">Completed</span>;
      case 'delayed':
        return <span className="status-badge delayed">Delayed</span>;
      default:
        return null;
    }
  };
  
  const getTaskPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'low':
        return <span className="priority-badge low">Low</span>;
      case 'medium':
        return <span className="priority-badge medium">Medium</span>;
      case 'high':
        return <span className="priority-badge high">High</span>;
      case 'urgent':
        return <span className="priority-badge urgent">Urgent</span>;
      default:
        return null;
    }
  };
  
  const getDocumentTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'contract': return <FileText size={16} className="document-icon contract" />;
      case 'report': return <FileText size={16} className="document-icon report" />;
      case 'plan': return <FileText size={16} className="document-icon plan" />;
      case 'invoice': return <FileText size={16} className="document-icon invoice" />;
      default: return <FileText size={16} />;
    }
  };
  
  const filteredCollaborators = activeTeamFilter === 'all' 
    ? collaborators 
    : collaborators.filter(c => c.type === activeTeamFilter);
    
  const filteredTasks = activeTaskFilter === 'all'
    ? tasks
    : tasks.filter(t => t.status === activeTaskFilter);
  
  return (
    <div className="collaboration-page">
      <div className="collaboration-header">
        <div>
          <h1 className="page-title">Collaboration Hub</h1>
          <p className="page-description">
            Coordinate across teams, suppliers, and partners in real-time
          </p>
        </div>
      </div>
      
      <div className="collaboration-tabs">
        <button 
          className={`tab-button ${activeTab === 'team' ? 'active' : ''}`} 
          onClick={() => setActiveTab('team')}
        >
          <Users size={18} />
          <span>Team & Partners</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`} 
          onClick={() => setActiveTab('tasks')}
        >
          <ClipboardCheck size={18} />
          <span>Tasks & Projects</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`} 
          onClick={() => setActiveTab('documents')}
        >
          <FileText size={18} />
          <span>Documents</span>
        </button>
      </div>
      
      <div className="collaboration-content glass-card">
        {activeTab === 'team' && (
          <div className="team-section">
            <div className="section-header">
              <h2 className="section-title">Supply Chain Network</h2>
              
              <div className="section-actions">
                <div className="filter-dropdown">
                  <button className="filter-btn">
                    <Filter size={16} />
                    <span>Filter</span>
                    <ChevronDown size={14} />
                  </button>
                  <div className="filter-menu">
                    <button 
                      className={`filter-option ${activeTeamFilter === 'all' ? 'selected' : ''}`}
                      onClick={() => setActiveTeamFilter('all')}
                    >
                      <Users size={14} />
                      <span>All</span>
                      {activeTeamFilter === 'all' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTeamFilter === 'internal' ? 'selected' : ''}`}
                      onClick={() => setActiveTeamFilter('internal')}
                    >
                      <User size={14} />
                      <span>Internal Team</span>
                      {activeTeamFilter === 'internal' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTeamFilter === 'supplier' ? 'selected' : ''}`}
                      onClick={() => setActiveTeamFilter('supplier')}
                    >
                      <Building size={14} />
                      <span>Suppliers</span>
                      {activeTeamFilter === 'supplier' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTeamFilter === 'logistics' ? 'selected' : ''}`}
                      onClick={() => setActiveTeamFilter('logistics')}
                    >
                      <Truck size={14} />
                      <span>Logistics Partners</span>
                      {activeTeamFilter === 'logistics' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTeamFilter === 'retail' ? 'selected' : ''}`}
                      onClick={() => setActiveTeamFilter('retail')}
                    >
                      <Building size={14} />
                      <span>Retail Partners</span>
                      {activeTeamFilter === 'retail' && <Check size={14} />}
                    </button>
                  </div>
                </div>
                
                <div className="search-container">
                  <Search size={16} />
                  <input type="text" placeholder="Search team..." />
                </div>
                
                <button className="add-btn">
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>
            </div>
            
            <div className="collaborators-grid">
              {filteredCollaborators.map(collaborator => (
                <div key={collaborator.id} className="collaborator-card">
                  <div className="collaborator-avatar">
                    {collaborator.avatar ? (
                      <img src={collaborator.avatar} alt={collaborator.name} />
                    ) : (
                      <div className={`avatar-placeholder ${collaborator.type}`}>
                        {getCollaboratorIcon(collaborator.type)}
                      </div>
                    )}
                    <span className={`status-indicator ${collaborator.status}`}></span>
                  </div>
                  
                  <div className="collaborator-info">
                    <h3 className="collaborator-name">{collaborator.name}</h3>
                    <p className="collaborator-role">{collaborator.role}</p>
                  </div>
                  
                  <div className="collaborator-actions">
                    <button className="action-btn">
                      <MessageSquare size={16} />
                    </button>
                    <button className="action-btn">
                      <Calendar size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h2 className="section-title">Tasks & Projects</h2>
              
              <div className="section-actions">
                <div className="filter-dropdown">
                  <button className="filter-btn">
                    <Filter size={16} />
                    <span>Status</span>
                    <ChevronDown size={14} />
                  </button>
                  <div className="filter-menu">
                    <button 
                      className={`filter-option ${activeTaskFilter === 'all' ? 'selected' : ''}`}
                      onClick={() => setActiveTaskFilter('all')}
                    >
                      <span>All Tasks</span>
                      {activeTaskFilter === 'all' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTaskFilter === 'pending' ? 'selected' : ''}`}
                      onClick={() => setActiveTaskFilter('pending')}
                    >
                      <span>Pending</span>
                      {activeTaskFilter === 'pending' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTaskFilter === 'inProgress' ? 'selected' : ''}`}
                      onClick={() => setActiveTaskFilter('inProgress')}
                    >
                      <span>In Progress</span>
                      {activeTaskFilter === 'inProgress' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTaskFilter === 'completed' ? 'selected' : ''}`}
                      onClick={() => setActiveTaskFilter('completed')}
                    >
                      <span>Completed</span>
                      {activeTaskFilter === 'completed' && <Check size={14} />}
                    </button>
                    <button 
                      className={`filter-option ${activeTaskFilter === 'delayed' ? 'selected' : ''}`}
                      onClick={() => setActiveTaskFilter('delayed')}
                    >
                      <span>Delayed</span>
                      {activeTaskFilter === 'delayed' && <Check size={14} />}
                    </button>
                  </div>
                </div>
                
                <div className="search-container">
                  <Search size={16} />
                  <input type="text" placeholder="Search tasks..." />
                </div>
                
                <button className="add-btn">
                  <Plus size={16} />
                  <span>New Task</span>
                </button>
              </div>
            </div>
            
            <div className="tasks-table">
              <div className="table-header">
                <div className="task-col task-title-col">Task</div>
                <div className="task-col task-assignees-col">Assignees</div>
                <div className="task-col task-status-col">Status</div>
                <div className="task-col task-priority-col">Priority</div>
                <div className="task-col task-due-col">Due Date</div>
                <div className="task-col task-actions-col">Actions</div>
              </div>
              
              <div className="table-body">
                {filteredTasks.map(task => (
                  <div key={task.id} className="task-row">
                    <div className="task-col task-title-col">
                      <div className="task-title-wrapper">
                        <ClipboardCheck size={18} className="task-icon" />
                        <div>
                          <h4 className="task-title">{task.title}</h4>
                          <p className="task-description">{task.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="task-col task-assignees-col">
                      <div className="task-assignees">
                        {task.assignedTo.map((assigneeId, index) => {
                          const assignee = collaborators.find(c => c.id === assigneeId);
                          if (!assignee) return null;
                          
                          return (
                            <div key={index} className="assignee-avatar" title={assignee.name}>
                              {assignee.avatar ? (
                                <img src={assignee.avatar} alt={assignee.name} />
                              ) : (
                                <div className={`avatar-placeholder mini ${assignee.type}`}>
                                  {assignee.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {task.assignedTo.length > 3 && (
                          <div className="assignee-count">+{task.assignedTo.length - 3}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="task-col task-status-col">
                      {getTaskStatusBadge(task.status)}
                    </div>
                    
                    <div className="task-col task-priority-col">
                      {getTaskPriorityBadge(task.priority)}
                    </div>
                    
                    <div className="task-col task-due-col">
                      <div className="due-date">
                        <Calendar size={14} />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="task-col task-actions-col">
                      <div className="task-actions">
                        <button className="task-action-btn">
                          <MessageSquare size={14} />
                        </button>
                        <button className="task-action-btn">
                          <Check size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="documents-section">
            <div className="section-header">
              <h2 className="section-title">Documents & Files</h2>
              
              <div className="section-actions">
                <div className="filter-dropdown">
                  <button className="filter-btn">
                    <Filter size={16} />
                    <span>Document Type</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
                
                <div className="search-container">
                  <Search size={16} />
                  <input type="text" placeholder="Search documents..." />
                </div>
                
                <button className="add-btn">
                  <Plus size={16} />
                  <span>Upload</span>
                </button>
              </div>
            </div>
            
            <div className="documents-table">
              <div className="table-header">
                <div className="doc-col doc-name-col">Document</div>
                <div className="doc-col doc-type-col">Type</div>
                <div className="doc-col doc-uploaded-by-col">Uploaded By</div>
                <div className="doc-col doc-date-col">Date</div>
                <div className="doc-col doc-size-col">Size</div>
                <div className="doc-col doc-actions-col">Actions</div>
              </div>
              
              <div className="table-body">
                {documents.map(doc => (
                  <div key={doc.id} className="doc-row">
                    <div className="doc-col doc-name-col">
                      <div className="doc-name-wrapper">
                        {getDocumentTypeIcon(doc.type)}
                        <h4 className="doc-title">{doc.title}</h4>
                      </div>
                    </div>
                    
                    <div className="doc-col doc-type-col">
                      <span className={`doc-type ${doc.type}`}>{doc.type}</span>
                    </div>
                    
                    <div className="doc-col doc-uploaded-by-col">
                      {doc.uploadedBy}
                    </div>
                    
                    <div className="doc-col doc-date-col">
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                    
                    <div className="doc-col doc-size-col">
                      {doc.size}
                    </div>
                    
                    <div className="doc-col doc-actions-col">
                      <div className="doc-actions">
                        <button className="doc-action-btn">
                          <Download size={14} />
                        </button>
                        <button className="doc-action-btn">
                          <MessageSquare size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaboration;