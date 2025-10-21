import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth.jsx';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (roles.length && !roles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
