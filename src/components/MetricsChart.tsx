import React from 'react';
import './MetricsChart.css';

interface ChartData {
  labels: string[];
  values: number[];
  target?: number;
}

interface MetricsChartProps {
  title: string;
  data: ChartData;
  type: 'bar' | 'line' | 'area';
  color?: string;
  height?: number;
}

const MetricsChart: React.FC<MetricsChartProps> = ({
  title,
  data,
  type = 'bar',
  color = 'var(--primary-500)',
  height = 200
}) => {
  // Find the maximum value to normalize chart heights
  const maxValue = Math.max(...data.values);
  
  // Simple chart rendering for demonstration purposes
  // In a real app, you'd likely use a library like Chart.js, Recharts, or D3.js
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <div className="chart-container" style={{ height: `${height}px` }}>
            {data.values.map((value, index) => {
              const normalizedHeight = (value / maxValue) * 100;
              return (
                <div className="chart-column" key={index}>
                  <div 
                    className="chart-bar" 
                    style={{ 
                      height: `${normalizedHeight}%`,
                      backgroundColor: color
                    }}
                    data-tooltip={value}
                  ></div>
                  <div className="chart-label">{data.labels[index]}</div>
                </div>
              );
            })}
            
            {data.target && (
              <div 
                className="chart-target-line" 
                style={{ 
                  bottom: `${(data.target / maxValue) * 100}%`
                }}
              >
                <span className="chart-target-label">Target: {data.target}</span>
              </div>
            )}
          </div>
        );
        
      case 'line':
      case 'area':
        // Simplified SVG-based line chart
        const points = data.values.map((value, index) => {
          const x = (index / (data.values.length - 1)) * 100;
          const y = 100 - (value / maxValue) * 100;
          return `${x},${y}`;
        }).join(' ');
        
        return (
          <div className="chart-container" style={{ height: `${height}px` }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {type === 'area' && (
                <polygon
                  points={`0,100 ${points} 100,100`}
                  fill={`${color}20`}
                />
              )}
              <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
              {data.values.map((value, index) => {
                const x = (index / (data.values.length - 1)) * 100;
                const y = 100 - (value / maxValue) * 100;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="white"
                    stroke={color}
                    strokeWidth="1"
                    className="chart-point"
                    data-tooltip={value}
                  />
                );
              })}
              
              {data.target && (
                <line
                  x1="0"
                  y1={100 - (data.target / maxValue) * 100}
                  x2="100"
                  y2={100 - (data.target / maxValue) * 100}
                  stroke="#FF5733"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
              )}
            </svg>
            
            <div className="chart-labels">
              {data.labels.map((label, index) => (
                <div 
                  key={index} 
                  className="chart-label" 
                  style={{ 
                    left: `${(index / (data.labels.length - 1)) * 100}%` 
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="metrics-chart glass-card">
      <div className="metrics-chart-header">
        <h3 className="metrics-chart-title">{title}</h3>
      </div>
      {renderChart()}
    </div>
  );
};

export default MetricsChart;