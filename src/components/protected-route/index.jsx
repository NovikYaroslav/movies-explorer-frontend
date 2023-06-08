import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorizationSelector } from '../../store/reducers/authorization';

function ProtectedRoute({ element }) {
  const loggedIn = useSelector(authorizationSelector);
  if (loggedIn) {
    return element;
  }
  return <Navigate to='/' replace />;
}

export default ProtectedRoute;
