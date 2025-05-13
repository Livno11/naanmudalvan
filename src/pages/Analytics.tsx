import React, { useState } from 'react';
import MetricsChart from '../components/MetricsChart';
import { 
  Calendar, 
  Download, 
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertCircle,
  PieChart,
  BarChart2,
  LineChart,
  Filter
} from 'lucide-react';
import './Analytics.css';

const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'quarter'>('month');
  const [category, setCategory] = useState<'overview' | 'inventory' | 'logistics' | 'forecasting'>('overview');
  
  // Example data for analytics charts
  const inventoryAccuracyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [92, 93, 91, 94, 95, 96],
    target: 95
  };
  
  const orderCycleTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [4.8, 4.5, 4.2, 3.9, 3.7, 3.5],
    target: 4.0
  };
  
  const costBreakdownData = {
    labels: ['Raw Materials', 'Labor', 'Transport', 'Storage', 'Other'],
    values: [35, 25, 20, 15, 5],
  };
  
  const demandForecastData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [105, 110, 115, 125, 130, 120],
    target: 110
  };
  
  const warehouseUtilizationData = {
    labels: ['E. Warehouse', 'W. Warehouse', 'N. Warehouse', 'S. Warehouse', 'Central'],
    values: [76, 82, 65, 91, 78],
    target: 80
  };
  
  const transportCostsData = {
    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
    values: [142, 138, 131, 128, 125, 120],
    target: 130
  };
  
  // KPI data
  const kpiData = [
    {
      title: 'On-Time Delivery',
      value: '94.2%',
      change: 2.1,
      isPositive: true
    },
    {
      title: 'Inventory Turnover',
      value: '5.8x',
      change: 0.4,
      isPositive: true
    },
    {
      title: 'Perfect Order Rate',
      value: '91.7%',
      change: 1.5,
      isPositive: true
    },
    {
      title: 'Return Rate',
      value: '2.3%',
      change: 0.7,
      isPositive: false
    },
    {
      title: 'Forecast Accuracy',
      value: '86.9%',
      change: 3.2,
      isPositive: true
    },
    {
      title: 'Supply Chain Cost',
      value: '$3.2M',
      change: 4.5,
      isPositive: false
    },
  ];
  
  // Insights data
  const insightsData = [
    {
      title: 'Inventory Optimization',
      description: 'AI analysis suggests reducing safety stock for SKU-3822 by 15% to optimize working capital without impacting service levels.',
      impact: 'High',
      impactColor: 'success'
    },
    {
      title: 'Transport Route Inefficiency',
      description: 'East-West corridor showing consistent delivery delays. Alternative routing could improve on-time delivery by 8%.',
      impact: 'Medium',
      impactColor: 'warning'
    },
    {
      title: 'Demand Pattern Shift',
      description: 'Urban stores showing 23% higher demand variability compared to suburban locations. Requires differentiated inventory strategy.',
      impact: 'High',
      impactColor: 'success'
    },
    {
      title: 'Supplier Risk Alert',
      description: 'Secondary supplier showing quality inconsistency patterns that correlate with production issues downstream.',
      impact: 'Critical',
      impactColor: 'error'
    }
  ];
  
  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1 className="page-title">Supply Chain Analytics</h1>
          <p className="page-description">
            Data-driven insights across your entire supply chain operations
          </p>
        </div>
        
        <div className="analytics-actions">
          <button className="analytics-action-btn">
            <Calendar size={16} />
            <span>Date Range</span>
          </button>
          <button className="analytics-action-btn">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="analytics-action-btn">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      <div className="analytics-filters">
        <div className="timeframe-filter">
          <button 
            className={`filter-option ${timeframe === 'day' ? 'active' : ''}`}
            onClick={() => setTimeframe('day')}
          >
            Day
          </button>
          <button 
            className={`filter-option ${timeframe === 'week' ? 'active' : ''}`}
            onClick={() => setTimeframe('week')}
          >
            Week
          </button>
          <button 
            className={`filter-option ${timeframe === 'month' ? 'active' : ''}`}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
          <button 
            className={`filter-option ${timeframe === 'quarter' ? 'active' : ''}`}
            onClick={() => setTimeframe('quarter')}
          >
            Quarter
          </button>
        </div>
        
        <div className="category-filter">
          <button 
            className={`filter-option ${category === 'overview' ? 'active' : ''}`}
            onClick={() => setCategory('overview')}
          >
            <BarChart2 size={16} />
            <span>Overview</span>
          </button>
          <button 
            className={`filter-option ${category === 'inventory' ? 'active' : ''}`}
            onClick={() => setCategory('inventory')}
          >
            <PieChart size={16} />
            <span>Inventory</span>
          </button>
          <button 
            className={`filter-option ${category === 'logistics' ? 'active' : ''}`}
            onClick={() => setCategory('logistics')}
          >
            <LineChart size={16} />
            <span>Logistics</span>
          </button>
          <button 
            className={`filter-option ${category === 'forecasting' ? 'active' : ''}`}
            onClick={() => setCategory('forecasting')}
          >
            <TrendingUp size={16} />
            <span>Forecasting</span>
          </button>
        </div>
      </div>
      
      <div className="kpi-cards-grid">
        {kpiData.map((kpi, index) => (
          <div key={index} className="kpi-card glass-card">
            <div className="kpi-card-header">
              <h3 className="kpi-title">{kpi.title}</h3>
              <div className={`kpi-change ${kpi.isPositive ? 'positive' : 'negative'}`}>
                {kpi.isPositive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                <span>{kpi.change}%</span>
              </div>
            </div>
            <div className="kpi-value">{kpi.value}</div>
          </div>
        ))}
      </div>
      
      <div className="analytics-charts-grid">
        <div className="chart-card">
          <MetricsChart 
            title="Inventory Accuracy Trend" 
            data={inventoryAccuracyData}
            type="line"
            color="var(--primary-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Order Cycle Time (Days)" 
            data={orderCycleTimeData}
            type="line"
            color="var(--secondary-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Supply Chain Cost Breakdown" 
            data={costBreakdownData}
            type="bar"
            color="var(--accent-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Demand Forecast (next 6 months)" 
            data={demandForecastData}
            type="area"
            color="var(--primary-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Warehouse Utilization (%)" 
            data={warehouseUtilizationData}
            type="bar"
            color="var(--secondary-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Transport Costs ($ thousands)" 
            data={transportCostsData}
            type="line"
            color="var(--accent-500)"
          />
        </div>
      </div>
      
      <div className="insights-section glass-card">
        <div className="insights-header">
          <h2 className="section-title">AI-Powered Insights</h2>
          <button className="filter-btn">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="insights-grid">
          {insightsData.map((insight, index) => (
            <div key={index} className="insight-card">
              <div className="insight-header">
                <h3 className="insight-title">{insight.title}</h3>
                <span className={`impact-badge ${insight.impactColor}`}>
                  {insight.impact} Impact
                </span>
              </div>
              <p className="insight-description">{insight.description}</p>
              <button className="insight-action-btn">
                <span>View Details</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;