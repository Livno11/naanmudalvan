import React, { useState } from 'react';
import {
  Blocks,
  Search,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Clock,
  FileText,
  Truck,
  Factory,
  Package,
  Store,
  Users,
  ArrowUpRight,
  Filter,
  Download
} from 'lucide-react';
import './Blockchain.css';

type TransactionStatus = 'verified' | 'pending' | 'processing';
type TransactionType = 'supply' | 'production' | 'distribution' | 'retail' | 'customer';

interface Transaction {
  id: string;
  hash: string;
  type: TransactionType;
  description: string;
  timestamp: string;
  status: TransactionStatus;
  location: string;
  participants: string[];
  documents?: string[];
}

interface ProductTrace {
  productId: string;
  productName: string;
  currentLocation: string;
  currentStatus: string;
  manufacturer: string;
  manufactureDate: string;
  transactions: Transaction[];
}

const Blockchain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'trace'>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  
  // Example data
  const transactions: Transaction[] = [
    {
      id: 'tx1',
      hash: '0x8a2b7bbf9c6c76ef6fc8e1f3c3c761e1fbca66044e5c26cc032989140cdcbc63',
      type: 'supply',
      description: 'Raw materials received from Supplier A',
      timestamp: '2025-06-20T08:30:00Z',
      status: 'verified',
      location: 'Warehouse 1, California',
      participants: ['Supplier A', 'Logistics Co.', 'RetailReboot Inc.']
    },
    {
      id: 'tx2',
      hash: '0x3e8a7b4c2d1f9e8d7c6b5a4c3d2e1f9e8d7c6b5a4c3d2e1f9e8d7c6b5a4c3d2e',
      type: 'production',
      description: 'Product assembly completed',
      timestamp: '2025-06-21T14:45:00Z',
      status: 'verified',
      location: 'Manufacturing Plant, Detroit',
      participants: ['RetailReboot Inc.', 'Quality Control Team']
    },
    {
      id: 'tx3',
      hash: '0x9f8e7d6c5b4a3c2d1e0f1e2d3c4b5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f',
      type: 'distribution',
      description: 'Products shipped to East Coast distribution center',
      timestamp: '2025-06-22T10:15:00Z',
      status: 'verified',
      location: 'Transport Route 7, Ohio',
      participants: ['RetailReboot Inc.', 'FastShip Logistics']
    },
    {
      id: 'tx4',
      hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      type: 'retail',
      description: 'Inventory received at flagship store',
      timestamp: '2025-06-23T09:30:00Z',
      status: 'verified',
      location: 'Flagship Store, New York',
      participants: ['FastShip Logistics', 'RetailReboot Store #42']
    },
    {
      id: 'tx5',
      hash: '0x7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
      type: 'customer',
      description: 'Product purchased by customer',
      timestamp: '2025-06-24T15:20:00Z',
      status: 'processing',
      location: 'Flagship Store, New York',
      participants: ['RetailReboot Store #42', 'Customer ID: 378291']
    },
    {
      id: 'tx6',
      hash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
      type: 'supply',
      description: 'New electronic components received',
      timestamp: '2025-06-25T11:10:00Z',
      status: 'pending',
      location: 'Warehouse 3, Texas',
      participants: ['TechSupplier Inc.', 'RetailReboot Inc.']
    }
  ];
  
  const productTraces: ProductTrace[] = [
    {
      productId: 'PRD-78932-A',
      productName: 'Premium Bluetooth Headphones',
      currentLocation: 'Customer',
      currentStatus: 'Sold',
      manufacturer: 'RetailReboot Electronics',
      manufactureDate: '2025-06-15',
      transactions: [
        transactions[0],
        transactions[1],
        transactions[2],
        transactions[3],
        transactions[4]
      ]
    },
    {
      productId: 'PRD-65471-B',
      productName: 'Ultra HD Smart TV 55"',
      currentLocation: 'Flagship Store, New York',
      currentStatus: 'In Stock',
      manufacturer: 'RetailReboot Electronics',
      manufactureDate: '2025-06-10',
      transactions: [
        transactions[0],
        transactions[1],
        transactions[2],
        transactions[3]
      ]
    },
    {
      productId: 'PRD-92847-C',
      productName: 'Wireless Charging Dock',
      currentLocation: 'Transport Route 7, Ohio',
      currentStatus: 'In Transit',
      manufacturer: 'RetailReboot Electronics',
      manufactureDate: '2025-06-18',
      transactions: [
        transactions[0],
        transactions[1],
        transactions[2]
      ]
    }
  ];
  
  const getProductById = (id: string) => {
    return productTraces.find(p => p.productId === id);
  };
  
  const getTransactionById = (id: string) => {
    return transactions.find(t => t.id === id);
  };
  
  const getTransactionTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'supply': return <Factory size={18} />;
      case 'production': return <Package size={18} />;
      case 'distribution': return <Truck size={18} />;
      case 'retail': return <Store size={18} />;
      case 'customer': return <Users size={18} />;
      default: return <Blocks size={18} />;
    }
  };
  
  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'verified':
        return <span className="status-badge verified"><CheckCircle size={14} /> Verified</span>;
      case 'pending':
        return <span className="status-badge pending"><Clock size={14} /> Pending</span>;
      case 'processing':
        return <span className="status-badge processing"><ArrowUpRight size={14} /> Processing</span>;
      default:
        return null;
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search the blockchain
    console.log(`Searching for: ${searchQuery}`);
  };
  
  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    setActiveTab('trace');
  };
  
  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransaction(transactionId === selectedTransaction ? null : transactionId);
  };
  
  const selectedProductData = selectedProduct ? getProductById(selectedProduct) : null;
  
  return (
    <div className="blockchain-page">
      <div className="blockchain-header">
        <div>
          <h1 className="page-title">Blockchain Verification</h1>
          <p className="page-description">
            Transparent, immutable record of your supply chain transactions
          </p>
        </div>
      </div>
      
      <div className="blockchain-tabs">
        <button 
          className={`tab-button ${activeTab === 'explorer' ? 'active' : ''}`} 
          onClick={() => setActiveTab('explorer')}
        >
          <Blocks size={18} />
          <span>Transaction Explorer</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'trace' ? 'active' : ''}`} 
          onClick={() => setActiveTab('trace')}
        >
          <ArrowRight size={18} />
          <span>Product Traceability</span>
        </button>
      </div>
      
      <div className="blockchain-content glass-card">
        {activeTab === 'explorer' && (
          <div className="explorer-section">
            <div className="search-form-container">
              <form className="blockchain-search-form" onSubmit={handleSearch}>
                <div className="search-input-container">
                  <Search size={20} />
                  <input 
                    type="text" 
                    placeholder="Search by transaction hash, product ID, or participant..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-button">Search</button>
              </form>
            </div>
            
            <div className="transaction-filters">
              <button className="filter-button active">All Transactions</button>
              <button className="filter-button">Supply</button>
              <button className="filter-button">Production</button>
              <button className="filter-button">Distribution</button>
              <button className="filter-button">Retail</button>
              <button className="filter-button">Customer</button>
            </div>
            
            <div className="transactions-list">
              {transactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className={`transaction-card ${selectedTransaction === transaction.id ? 'selected' : ''}`}
                  onClick={() => handleTransactionSelect(transaction.id)}
                >
                  <div className="transaction-header">
                    <div className="transaction-type">
                      <div className={`type-icon ${transaction.type}`}>
                        {getTransactionTypeIcon(transaction.type)}
                      </div>
                      <span className="type-label">{transaction.type}</span>
                    </div>
                    {getStatusBadge(transaction.status)}
                  </div>
                  
                  <h3 className="transaction-title">{transaction.description}</h3>
                  
                  <div className="transaction-details">
                    <div className="detail-row">
                      <span className="detail-label">Timestamp:</span>
                      <span className="detail-value">{new Date(transaction.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{transaction.location}</span>
                    </div>
                  </div>
                  
                  <div className="transaction-hash">
                    <span className="hash-label">TX Hash:</span>
                    <span className="hash-value truncate">
                      {transaction.hash}
                    </span>
                  </div>
                  
                  {selectedTransaction === transaction.id && (
                    <div className="transaction-expanded animate-fade-in">
                      <div className="participants-section">
                        <h4 className="section-subtitle">Participants</h4>
                        <ul className="participants-list">
                          {transaction.participants.map((participant, index) => (
                            <li key={index} className="participant-item">
                              <User size={14} />
                              <span>{participant}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="transaction-actions">
                        <button className="action-button">
                          <FileText size={16} />
                          <span>View Certificate</span>
                        </button>
                        <button className="action-button">
                          <Download size={16} />
                          <span>Export Data</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'trace' && (
          <div className="trace-section">
            {!selectedProductData ? (
              <div className="product-selector">
                <h2 className="section-title">Select a Product to Trace</h2>
                
                <div className="product-search-container">
                  <div className="search-input-container">
                    <Search size={20} />
                    <input 
                      type="text" 
                      placeholder="Search by product ID or name..." 
                    />
                  </div>
                </div>
                
                <div className="products-list">
                  {productTraces.map(product => (
                    <div 
                      key={product.productId} 
                      className="product-card"
                      onClick={() => handleProductSelect(product.productId)}
                    >
                      <div className="product-info">
                        <h3 className="product-name">{product.productName}</h3>
                        <p className="product-id">{product.productId}</p>
                      </div>
                      <div className="product-status">
                        <span className={`status-indicator ${product.currentStatus.toLowerCase().replace(/\s+/g, '-')}`}></span>
                        <span className="status-text">{product.currentStatus}</span>
                      </div>
                      <ChevronRight size={20} className="card-arrow" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="product-trace-details">
                <div className="trace-actions">
                  <button className="back-button" onClick={() => setSelectedProduct(null)}>
                    <ArrowRight size={16} className="flip-horizontal" />
                    <span>Back to Products</span>
                  </button>
                  
                  <div className="action-buttons">
                    <button className="action-button secondary">
                      <Filter size={16} />
                      <span>Filter</span>
                    </button>
                    <button className="action-button primary">
                      <Download size={16} />
                      <span>Export Chain of Custody</span>
                    </button>
                  </div>
                </div>
                
                <div className="product-overview">
                  <div className="product-header">
                    <div>
                      <h2 className="product-title">{selectedProductData.productName}</h2>
                      <p className="product-id">ID: {selectedProductData.productId}</p>
                    </div>
                    <div className="product-meta">
                      <div className="meta-item">
                        <span className="meta-label">Manufacturer:</span>
                        <span className="meta-value">{selectedProductData.manufacturer}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Date:</span>
                        <span className="meta-value">{selectedProductData.manufactureDate}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Status:</span>
                        <span className="meta-value">{selectedProductData.currentStatus}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="journey-timeline">
                    <div className="timeline-header">
                      <h3 className="timeline-title">Supply Chain Journey</h3>
                    </div>
                    
                    <div className="timeline">
                      {selectedProductData.transactions.map((transaction, index) => (
                        <div key={transaction.id} className={`timeline-item ${transaction.status}`}>
                          <div className="timeline-point">
                            <div className="timeline-icon">
                              {getTransactionTypeIcon(transaction.type)}
                            </div>
                            <div className="timeline-line"></div>
                          </div>
                          
                          <div className="timeline-content">
                            <div className="timeline-header">
                              <h4 className="timeline-event">{transaction.description}</h4>
                              {getStatusBadge(transaction.status)}
                            </div>
                            
                            <div className="timeline-details">
                              <div className="timeline-meta">
                                <div className="meta-item">
                                  <Clock size={14} />
                                  <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="meta-item">
                                  <MapPin size={14} />
                                  <span>{transaction.location}</span>
                                </div>
                              </div>
                              
                              <div className="timeline-hash">
                                <span className="hash-label">Transaction Hash:</span>
                                <span className="hash-value truncate">{transaction.hash}</span>
                              </div>
                              
                              <button className="verify-btn">
                                <CheckCircle size={14} />
                                <span>Verify on Blockchain</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Needed for timeline
const MapPin = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default Blockchain;