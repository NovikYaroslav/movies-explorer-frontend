import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorizationSelector } from '../../store/reducers/authorization';

function ProtectedRoute({ element }) {
  const authorized = useSelector(authorizationSelector);
  console.log(authorized);
  if (authorized) {
    return element;
  }
  return <Navigate to='/' replace />;
}

export default ProtectedRoute;
