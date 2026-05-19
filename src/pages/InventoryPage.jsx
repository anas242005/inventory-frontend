import { useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';

const PKR_RATE = 280;

export default function InventoryPage({ products, onAdd, onDelete, onUpdate, editProduct, setEditProduct }) {
  const pkrProducts = products.map(p => ({
    ...p,
    price: (p.price * PKR_RATE).toFixed(0),
  }));

  const handleAdd = async (formData) => {
    const converted = { ...formData, price: (parseFloat(formData.price) / PKR_RATE).toFixed(2) };
    onAdd(converted);
  };

  const handleUpdate = (updated) => {
    const converted = { ...updated, price: (parseFloat(updated.price) / PKR_RATE).toFixed(2) };
    onUpdate(converted);
  };

  return (
    <div>
      <h2 className="mb-4">📋 Inventory — Owned Assets</h2>
      <p className="text-muted small">All prices shown in PKR (1 USD = ₨280)</p>

      <h5 className="mb-3">{editProduct ? 'Edit Product' : 'Add New Product'}</h5>
      <ProductForm
        onAdd={handleAdd}
        editProduct={editProduct ? { ...editProduct, price: (editProduct.price * PKR_RATE).toFixed(0) } : null}
        onUpdate={handleUpdate}
      />

      <h5 className="mb-3">All Products</h5>
      <ProductTable products={pkrProducts} onDelete={onDelete} onEdit={setEditProduct} pkr={true} />
    </div>
  );
}