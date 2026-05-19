const PKR_RATE = 280;

export default function Reports({ products }) {
  const total = products.length;
  const lowStock = products.filter(p => p.quantity <= p.lowStockThreshold).length;
  const totalValue = (products.reduce((sum, p) => sum + p.quantity * p.price, 0) * PKR_RATE)
    .toLocaleString('en-PK', { maximumFractionDigits: 0 });

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-center border-primary">
          <div className="card-body">
            <h5 className="card-title">Total Products</h5>
            <h2 className="text-primary">{total}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center border-danger">
          <div className="card-body">
            <h5 className="card-title">Low Stock Alerts</h5>
            <h2 className="text-danger">{lowStock}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center border-success">
          <div className="card-body">
            <h5 className="card-title">Total Inventory Value</h5>
            <h2 className="text-success">₨{totalValue}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}