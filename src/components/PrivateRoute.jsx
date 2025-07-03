import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading, isInitializing } = useAuth();

  if (isLoading || isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#123567]"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
