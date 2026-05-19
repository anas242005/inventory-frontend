import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/products';
const empty = { name: '', category: '', quantity: '', price: '', lowStockThreshold: 5 };

export default function ProductForm({ onAdd, editProduct, onUpdate }) {
  const [form, setForm] = useState(empty);

  // This is the fix — sync form when editProduct changes
  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    } else {
      setForm(empty);
    }
  }, [editProduct]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editProduct) {
      const res = await axios.put(`${API}/${editProduct._id}`, form);
      onUpdate(res.data);
    } else {
      const res = await axios.post(API, form);
      onAdd(res.data);
    }
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-md-3">
        <input className="form-control" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="col-md-2">
        <input className="form-control" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      </div>
      <div className="col-md-2">
        <input className="form-control" name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
      </div>
      <div className="col-md-2">
        <input className="form-control" name="price" type="number" placeholder="Price (₨)" value={form.price} onChange={handleChange} required />
      </div>
      <div className="col-md-2">
        <input className="form-control" name="lowStockThreshold" type="number" placeholder="Low Stock Alert" value={form.lowStockThreshold} onChange={handleChange} />
      </div>
      <div className="col-md-1">
        <button className="btn btn-primary w-100">{editProduct ? 'Update' : 'Add'}</button>
      </div>
    </form>
  );
}