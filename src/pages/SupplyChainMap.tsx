import React, { useState } from 'react';
import SupplyChainNode, { NodeStatus, NodeType } from '../components/SupplyChainNode';
import { 
  Factory, 
  Warehouse, 
  Truck, 
  Store, 
  Users,
  AlertCircle,
  CheckCircle, 
  Clock,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize
} from 'lucide-react';
import './SupplyChainMap.css';

interface Node {
  id: string;
  type: NodeType;
  name: string;
  status: NodeStatus;
  metrics: {
    label: string;
    value: string | number;
  }[];
  position: { x: number; y: number };
}

interface Connection {
  from: string;
  to: string;
  status: NodeStatus;
}

const SupplyChainMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [filters, setFilters] = useState({
    showIssues: false,
    nodeTypes: {
      supplier: true,
      warehouse: true,
      distribution: true,
      retail: true,
      customer: true
    }
  });
  
  // Example data for supply chain nodes
  const nodes: Node[] = [
    {
      id: 'supplier1',
      type: 'supplier',
      name: 'Primary Manufacturer',
      status: 'normal',
      metrics: [
        { label: 'Output', value: '98%' },
        { label: 'Lead Time', value: '4 days' }
      ],
      position: { x: 10, y: 50 }
    },
    {
      id: 'supplier2',
      type: 'supplier',
      name: 'Secondary Supplier',
      status: 'warning',
      metrics: [
        { label: 'Output', value: '85%' },
        { label: 'Lead Time', value: '7 days' }
      ],
      position: { x: 10, y: 150 }
    },
    {
      id: 'warehouse1',
      type: 'warehouse',
      name: 'Central Warehouse',
      status: 'normal',
      metrics: [
        { label: 'Capacity', value: '76%' },
        { label: 'Turnover', value: '3.5x' }
      ],
      position: { x: 30, y: 50 }
    },
    {
      id: 'warehouse2',
      type: 'warehouse',
      name: 'Regional Storage',
      status: 'critical',
      metrics: [
        { label: 'Capacity', value: '94%' },
        { label: 'Turnover', value: '2.1x' }
      ],
      position: { x: 30, y: 150 }
    },
    {
      id: 'distribution1',
      type: 'distribution',
      name: 'East Distribution',
      status: 'normal',
      metrics: [
        { label: 'Efficiency', value: '92%' },
        { label: 'Delivery', value: '1.2 days' }
      ],
      position: { x: 50, y: 30 }
    },
    {
      id: 'distribution2',
      type: 'distribution',
      name: 'West Distribution',
      status: 'normal',
      metrics: [
        { label: 'Efficiency', value: '88%' },
        { label: 'Delivery', value: '1.5 days' }
      ],
      position: { x: 50, y: 90 }
    },
    {
      id: 'distribution3',
      type: 'distribution',
      name: 'South Distribution',
      status: 'warning',
      metrics: [
        { label: 'Efficiency', value: '79%' },
        { label: 'Delivery', value: '2.3 days' }
      ],
      position: { x: 50, y: 150 }
    },
    {
      id: 'retail1',
      type: 'retail',
      name: 'Flagship Store',
      status: 'success',
      metrics: [
        { label: 'Stock', value: '97%' },
        { label: 'Sales', value: '+12%' }
      ],
      position: { x: 70, y: 20 }
    },
    {
      id: 'retail2',
      type: 'retail',
      name: 'Mall Location',
      status: 'normal',
      metrics: [
        { label: 'Stock', value: '92%' },
        { label: 'Sales', value: '+5%' }
      ],
      position: { x: 70, y: 70 }
    },
    {
      id: 'retail3',
      type: 'retail',
      name: 'Downtown Store',
      status: 'warning',
      metrics: [
        { label: 'Stock', value: '81%' },
        { label: 'Sales', value: '-3%' }
      ],
      position: { x: 70, y: 120 }
    },
    {
      id: 'retail4',
      type: 'retail',
      name: 'Outlet Center',
      status: 'normal',
      metrics: [
        { label: 'Stock', value: '88%' },
        { label: 'Sales', value: '+7%' }
      ],
      position: { x: 70, y: 170 }
    },
    {
      id: 'customer1',
      type: 'customer',
      name: 'Urban Customers',
      status: 'success',
      metrics: [
        { label: 'Satisfaction', value: '4.7/5' },
        { label: 'Growth', value: '+8%' }
      ],
      position: { x: 90, y: 70 }
    },
    {
      id: 'customer2',
      type: 'customer',
      name: 'Suburban Customers',
      status: 'normal',
      metrics: [
        { label: 'Satisfaction', value: '4.2/5' },
        { label: 'Growth', value: '+3%' }
      ],
      position: { x: 90, y: 150 }
    }
  ];
  
  // Example connections between nodes
  const connections: Connection[] = [
    { from: 'supplier1', to: 'warehouse1', status: 'normal' },
    { from: 'supplier2', to: 'warehouse1', status: 'warning' },
    { from: 'supplier2', to: 'warehouse2', status: 'critical' },
    { from: 'warehouse1', to: 'distribution1', status: 'normal' },
    { from: 'warehouse1', to: 'distribution2', status: 'normal' },
    { from: 'warehouse2', to: 'distribution2', status: 'warning' },
    { from: 'warehouse2', to: 'distribution3', status: 'warning' },
    { from: 'distribution1', to: 'retail1', status: 'success' },
    { from: 'distribution1', to: 'retail2', status: 'normal' },
    { from: 'distribution2', to: 'retail2', status: 'normal' },
    { from: 'distribution2', to: 'retail3', status: 'warning' },
    { from: 'distribution3', to: 'retail3', status: 'warning' },
    { from: 'distribution3', to: 'retail4', status: 'normal' },
    { from: 'retail1', to: 'customer1', status: 'success' },
    { from: 'retail2', to: 'customer1', status: 'normal' },
    { from: 'retail3', to: 'customer1', status: 'warning' },
    { from: 'retail3', to: 'customer2', status: 'normal' },
    { from: 'retail4', to: 'customer2', status: 'normal' },
  ];
  
  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'supplier': return <Factory size={20} />;
      case 'warehouse': return <Warehouse size={20} />;
      case 'distribution': return <Truck size={20} />;
      case 'retail': return <Store size={20} />;
      case 'customer': return <Users size={20} />;
      default: return null;
    }
  };
  
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };
  
  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
  };
  
  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };
  
  const resetZoom = () => {
    setZoom(1);
  };
  
  const toggleIssuesFilter = () => {
    setFilters(prev => ({
      ...prev,
      showIssues: !prev.showIssues
    }));
  };
  
  const toggleNodeTypeFilter = (type: NodeType) => {
    setFilters(prev => ({
      ...prev,
      nodeTypes: {
        ...prev.nodeTypes,
        [type]: !prev.nodeTypes[type]
      }
    }));
  };
  
  // Filter nodes based on current filters
  const filteredNodes = nodes.filter(node => {
    if (!filters.nodeTypes[node.type]) return false;
    if (filters.showIssues && node.status === 'normal') return false;
    return true;
  });
  
  // Filter connections based on filtered nodes
  const filteredConnections = connections.filter(conn => {
    const fromNode = filteredNodes.find(n => n.id === conn.from);
    const toNode = filteredNodes.find(n => n.id === conn.to);
    return fromNode && toNode;
  });
  
  const selectedNodeDetails = selectedNode 
    ? nodes.find(node => node.id === selectedNode) 
    : null;
  
  return (
    <div className="supply-chain-map-page">
      <div className="page-header">
        <h1 className="page-title">Supply Chain Digital Twin</h1>
        <p className="page-description">
          Interactive map of your end-to-end supply chain network
        </p>
      </div>
      
      <div className="map-container glass-card">
        <div className="map-toolbar">
          <div className="filter-controls">
            <button 
              className={`filter-btn ${filters.showIssues ? 'active' : ''}`}
              onClick={toggleIssuesFilter}
            >
              <AlertCircle size={16} />
              <span>Show Issues Only</span>
            </button>
            
            <div className="node-type-filters">
              <button 
                className={`node-type-btn ${filters.nodeTypes.supplier ? 'active' : ''}`}
                onClick={() => toggleNodeTypeFilter('supplier')}
              >
                <Factory size={14} />
                <span>Suppliers</span>
              </button>
              <button 
                className={`node-type-btn ${filters.nodeTypes.warehouse ? 'active' : ''}`}
                onClick={() => toggleNodeTypeFilter('warehouse')}
              >
                <Warehouse size={14} />
                <span>Warehouses</span>
              </button>
              <button 
                className={`node-type-btn ${filters.nodeTypes.distribution ? 'active' : ''}`}
                onClick={() => toggleNodeTypeFilter('distribution')}
              >
                <Truck size={14} />
                <span>Distribution</span>
              </button>
              <button 
                className={`node-type-btn ${filters.nodeTypes.retail ? 'active' : ''}`}
                onClick={() => toggleNodeTypeFilter('retail')}
              >
                <Store size={14} />
                <span>Retail</span>
              </button>
              <button 
                className={`node-type-btn ${filters.nodeTypes.customer ? 'active' : ''}`}
                onClick={() => toggleNodeTypeFilter('customer')}
              >
                <Users size={14} />
                <span>Customers</span>
              </button>
            </div>
          </div>
          
          <div className="zoom-controls">
            <button className="zoom-btn" onClick={zoomOut}>
              <ZoomOut size={16} />
            </button>
            <button className="zoom-btn" onClick={resetZoom}>
              <Maximize size={16} />
            </button>
            <button className="zoom-btn" onClick={zoomIn}>
              <ZoomIn size={16} />
            </button>
          </div>
        </div>
        
        <div className="map-visualization" style={{ transform: `scale(${zoom})` }}>
          <svg className="connections-container">
            {filteredConnections.map((conn, index) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              
              if (!fromNode || !toNode) return null;
              
              // Calculate connection path
              const x1 = fromNode.position.x + 5;
              const y1 = fromNode.position.y;
              const x2 = toNode.position.x - 5;
              const y2 = toNode.position.y;
              
              // Determine connection class based on status
              let connectionClass = 'connection-normal';
              if (conn.status === 'warning') connectionClass = 'connection-warning';
              if (conn.status === 'critical') connectionClass = 'connection-critical';
              if (conn.status === 'success') connectionClass = 'connection-success';
              
              return (
                <path
                  key={index}
                  d={`M${x1}% ${y1}% C${(x1+x2)/2}% ${y1}%, ${(x1+x2)/2}% ${y2}%, ${x2}% ${y2}%`}
                  className={`connection ${connectionClass}`}
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          
          <div className="nodes-container">
            {filteredNodes.map(node => (
              <div
                key={node.id}
                className="node-wrapper"
                style={{ 
                  left: `${node.position.x}%`, 
                  top: `${node.position.y}%` 
                }}
              >
                <SupplyChainNode
                  id={node.id}
                  type={node.type}
                  name={node.name}
                  status={node.status}
                  metrics={node.metrics}
                  icon={getNodeIcon(node.type)}
                  onClick={() => handleNodeClick(node.id)}
                  isSelected={selectedNode === node.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedNodeDetails && (
        <div className="node-details glass-card animate-fade-in">
          <div className="node-details-header">
            <div className={`status-indicator status-${selectedNodeDetails.status}`}>
              {selectedNodeDetails.status === 'normal' && <CheckCircle size={16} />}
              {selectedNodeDetails.status === 'warning' && <AlertCircle size={16} />}
              {selectedNodeDetails.status === 'critical' && <AlertCircle size={16} />}
              {selectedNodeDetails.status === 'success' && <CheckCircle size={16} />}
              <span>{selectedNodeDetails.status}</span>
            </div>
            <h3 className="node-details-title">
              {getNodeIcon(selectedNodeDetails.type)}
              {selectedNodeDetails.name}
            </h3>
          </div>
          
          <div className="node-details-content">
            <div className="details-section">
              <h4 className="details-section-title">Key Metrics</h4>
              <div className="metrics-list">
                {selectedNodeDetails.metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <span className="metric-item-label">{metric.label}</span>
                    <span className="metric-item-value">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="details-section">
              <h4 className="details-section-title">Connected Nodes</h4>
              <div className="connected-nodes">
                {connections
                  .filter(conn => conn.from === selectedNodeDetails.id || conn.to === selectedNodeDetails.id)
                  .map((conn, index) => {
                    const connectedNodeId = conn.from === selectedNodeDetails.id ? conn.to : conn.from;
                    const connectedNode = nodes.find(n => n.id === connectedNodeId);
                    const isUpstream = conn.to === selectedNodeDetails.id;
                    
                    if (!connectedNode) return null;
                    
                    return (
                      <div key={index} className="connected-node-item">
                        <div className="connection-direction">
                          {isUpstream ? 'From:' : 'To:'}
                        </div>
                        <div className={`connection-status status-${conn.status}`}>
                          {conn.status === 'normal' && <CheckCircle size={12} />}
                          {conn.status === 'warning' && <AlertCircle size={12} />}
                          {conn.status === 'critical' && <AlertCircle size={12} />}
                          {conn.status === 'success' && <CheckCircle size={12} />}
                        </div>
                        <div className="connected-node-name">
                          {getNodeIcon(connectedNode.type)}
                          <span>{connectedNode.name}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            
            <div className="details-section">
              <h4 className="details-section-title">Recent Activity</h4>
              <div className="recent-activity">
                <div className="activity-item">
                  <Clock size={14} />
                  <span className="activity-time">1h ago</span>
                  <span className="activity-description">Inventory level updated</span>
                </div>
                <div className="activity-item">
                  <Clock size={14} />
                  <span className="activity-time">3h ago</span>
                  <span className="activity-description">Order batch processed</span>
                </div>
                <div className="activity-item">
                  <Clock size={14} />
                  <span className="activity-time">5h ago</span>
                  <span className="activity-description">Restocking scheduled</span>
                </div>
              </div>
            </div>
            
            <div className="node-details-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-outline">Run Simulation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplyChainMap;