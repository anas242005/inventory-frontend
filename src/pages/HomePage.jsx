import StockTicker from '../components/StockTicker';
import Reports from '../components/Reports';

export default function HomePage({ products }) {
  return (
    <div>
      <h2 className="mb-4">🏠 Home</h2>
      <Reports products={products} />
      <StockTicker />
    </div>
  );
}