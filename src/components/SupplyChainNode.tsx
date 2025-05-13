import React from 'react';
import './SupplyChainNode.css';

export type NodeStatus = 'normal' | 'warning' | 'critical' | 'success';
export type NodeType = 'supplier' | 'warehouse' | 'distribution' | 'retail' | 'customer';

interface SupplyChainNodeProps {
  id: string;
  type: NodeType;
  name: string;
  status: NodeStatus;
  metrics?: {
    label: string;
    value: string | number;
  }[];
  position?: { x: number; y: number };
  icon?: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
}

const SupplyChainNode: React.FC<SupplyChainNodeProps> = ({
  type,
  name,
  status,
  metrics = [],
  icon,
  onClick,
  isSelected = false
}) => {
  const getStatusClass = () => {
    switch (status) {
      case 'normal': return 'node-status-normal';
      case 'warning': return 'node-status-warning';
      case 'critical': return 'node-status-critical';
      case 'success': return 'node-status-success';
      default: return 'node-status-normal';
    }
  };
  
  const getTypeClass = () => {
    switch (type) {
      case 'supplier': return 'node-type-supplier';
      case 'warehouse': return 'node-type-warehouse';
      case 'distribution': return 'node-type-distribution';
      case 'retail': return 'node-type-retail';
      case 'customer': return 'node-type-customer';
      default: return '';
    }
  };
  
  return (
    <div 
      className={`supply-chain-node ${getTypeClass()} ${getStatusClass()} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="node-status-indicator"></div>
      <div className="node-icon">
        {icon}
      </div>
      <div className="node-content">
        <h4 className="node-name">{name}</h4>
        
        {metrics.length > 0 && (
          <div className="node-metrics">
            {metrics.map((metric, index) => (
              <div key={index} className="node-metric">
                <span className="metric-label">{metric.label}:</span>
                <span className="metric-value">{metric.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplyChainNode;