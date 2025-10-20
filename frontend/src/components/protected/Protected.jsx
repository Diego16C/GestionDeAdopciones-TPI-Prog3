import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (roles.length && !roles.includes(user.role))
    return <Navigate to="/register" />;

  return children;
};

export default ProtectedRoute;
