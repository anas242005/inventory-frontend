import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://inventory-backend-production-79c9.up.railway.app/api/stocks';

export default function StockTicker() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchStocks = async () => {
    try {
      const res = await axios.get(API);
      setStocks(res.data);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError('Could not load stock data. Market may be closed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 60000); // refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="text-center py-4">
      <div className="spinner-border text-success" role="status" />
      <p className="mt-2 text-muted">Loading PSX stocks...</p>
    </div>
  );

  if (error) return (
    <div className="alert alert-warning">{error}</div>
  );

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">📈 PSX Live Stock Prices</h4>
        <div className="d-flex align-items-center gap-2">
          {lastUpdated && <small className="text-muted">Last updated: {lastUpdated}</small>}
          <button className="btn btn-sm btn-outline-success" onClick={fetchStocks}>
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="row g-3">
        {stocks.map((stock) => {
          const isPositive = parseFloat(stock.change) >= 0;
          return (
            <div className="col-md-4 col-lg-3" key={stock.symbol}>
              <div className={`card h-100 border-${isPositive ? 'success' : 'danger'}`}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="card-title mb-0 fw-bold">{stock.symbol}</h6>
                      <small className="text-muted">{stock.name}</small>
                    </div>
                    <span className={`badge bg-${isPositive ? 'success' : 'danger'}`}>
                      {isPositive ? '▲' : '▼'} {stock.changePercent}%
                    </span>
                  </div>
                  <h4 className="mt-2 mb-1">₨ {stock.price?.toLocaleString()}</h4>
                  <small className={`text-${isPositive ? 'success' : 'danger'}`}>
                    {isPositive ? '+' : ''}{stock.change} today
                  </small>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">H: {stock.high?.toLocaleString()}</small>
                    <small className="text-muted">L: {stock.low?.toLocaleString()}</small>
                  </div>
                  <small className="text-muted">
                    Vol: {stock.volume?.toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}