import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

export default function CategoriesLayout({ children }) {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </ProtectedRoute>
  );
}
