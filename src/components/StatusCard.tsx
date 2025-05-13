import React from 'react';
import './StatusCard.css';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  trendLabel?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel = 'vs. last period',
  color = 'primary'
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary': return 'status-card-primary';
      case 'secondary': return 'status-card-secondary';
      case 'accent': return 'status-card-accent';
      case 'success': return 'status-card-success';
      case 'warning': return 'status-card-warning';
      case 'error': return 'status-card-error';
      default: return 'status-card-primary';
    }
  };

  return (
    <div className={`status-card glass-card ${getColorClass()}`}>
      <div className="status-card-icon">
        {icon}
      </div>
      <div className="status-card-content">
        <h3 className="status-card-title">{title}</h3>
        <p className="status-card-value">{value}</p>
        
        {trend && (
          <div className={`status-card-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            <span className="trend-value">
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="trend-label">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;