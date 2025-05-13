import React from 'react';
import StatusCard from '../components/StatusCard';
import MetricsChart from '../components/MetricsChart';
import { 
  Package, 
  TruckIcon, 
  AlertCircle, 
  DollarSign, 
  Zap, 
  BarChart, 
  Clock, 
  Store
} from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  // Example data
  const inventoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [64, 58, 75, 80, 65, 90],
    target: 70
  };
  
  const fulfillmentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [92, 95, 88, 96, 90, 85, 91]
  };
  
  const alertsData = {
    labels: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'],
    values: [5, 3, 7, 9, 4, 2]
  };
  
  const efficiencyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [68, 72, 78, 85]
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Supply Chain Command Center</h1>
        <p className="page-description">
          Real-time overview of your entire supply chain network
        </p>
      </div>
      
      <div className="status-cards-grid">
        <StatusCard 
          title="Inventory Levels" 
          value="92.4%" 
          icon={<Package size={24} />}
          trend={{ value: 3.2, isPositive: true }}
          color="primary"
        />
        <StatusCard 
          title="On-Time Delivery" 
          value="88.7%" 
          icon={<TruckIcon size={24} />}
          trend={{ value: 1.8, isPositive: true }}
          color="secondary"
        />
        <StatusCard 
          title="Active Alerts" 
          value="12" 
          icon={<AlertCircle size={24} />}
          trend={{ value: 4, isPositive: false }}
          color="error"
        />
        <StatusCard 
          title="Cost Efficiency" 
          value="$1.24M" 
          icon={<DollarSign size={24} />}
          trend={{ value: 6.5, isPositive: true }}
          color="success"
        />
      </div>
      
      <div className="metrics-charts-grid">
        <div className="chart-card">
          <MetricsChart 
            title="Inventory Accuracy" 
            data={inventoryData}
            type="bar"
            color="var(--primary-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Order Fulfillment Rate" 
            data={fulfillmentData}
            type="line"
            color="var(--secondary-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Exception Alerts" 
            data={alertsData}
            type="area"
            color="var(--error-500)"
          />
        </div>
        <div className="chart-card">
          <MetricsChart 
            title="Supply Chain Efficiency" 
            data={efficiencyData}
            type="bar"
            color="var(--success-500)"
          />
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section glass-card">
          <h2 className="section-title">Critical Insights</h2>
          
          <div className="insight-cards">
            <div className="insight-card">
              <div className="insight-icon">
                <Zap size={20} />
              </div>
              <div className="insight-content">
                <h3 className="insight-title">AI Prediction</h3>
                <p className="insight-description">
                  Potential stock-out risk for SKU-78932 in Northeast region within 7 days
                </p>
                <div className="insight-actions">
                  <button className="btn-sm btn-primary">Review</button>
                  <button className="btn-sm btn-outline">Dismiss</button>
                </div>
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">
                <BarChart size={20} />
              </div>
              <div className="insight-content">
                <h3 className="insight-title">Demand Forecast</h3>
                <p className="insight-description">
                  Seasonal product demand expected to increase by 34% in the next 30 days
                </p>
                <div className="insight-actions">
                  <button className="btn-sm btn-primary">Analyze</button>
                  <button className="btn-sm btn-outline">Dismiss</button>
                </div>
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">
                <Clock size={20} />
              </div>
              <div className="insight-content">
                <h3 className="insight-title">Lead Time Alert</h3>
                <p className="insight-description">
                  Supplier lead times for critical components have increased by 5 days
                </p>
                <div className="insight-actions">
                  <button className="btn-sm btn-primary">Mitigate</button>
                  <button className="btn-sm btn-outline">Dismiss</button>
                </div>
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">
                <Store size={20} />
              </div>
              <div className="insight-content">
                <h3 className="insight-title">Store Performance</h3>
                <p className="insight-description">
                  3 stores showing repeated out-of-stock incidents on high-margin products
                </p>
                <div className="insight-actions">
                  <button className="btn-sm btn-primary">Investigate</button>
                  <button className="btn-sm btn-outline">Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;