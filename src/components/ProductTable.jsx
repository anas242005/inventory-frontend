import axios from 'axios';

const API = 'https://inventory-backend-production-79c9.up.railway.app/api/products';

export default function ProductTable({ products, onDelete, onEdit, pkr = false }) {
  const symbol = pkr ? '₨' : '$';

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    onDelete(id);
  };

  return (
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>Name</th><th>Category</th><th>Qty</th><th>Price ({symbol})</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p._id} className={p.quantity <= p.lowStockThreshold ? 'table-danger' : ''}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{p.quantity}</td>
            <td>{symbol}{Number(p.price).toLocaleString()}</td>
            <td>
              {p.quantity <= p.lowStockThreshold
                ? <span className="badge bg-danger">Low Stock</span>
                : <span className="badge bg-success">OK</span>}
            </td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(p)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}