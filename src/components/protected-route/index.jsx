import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorizationSelector } from '../../store/reducers/authorization';
import Preloader from '../preloader';

function ProtectedRoute({ element }) {
  const authorized = useSelector(authorizationSelector);

  if (authorized === undefined) {
    return <Preloader />;
  }
  if (authorized) {
    return element;
  }
  return <Navigate to='/' replace />;
}

export default ProtectedRoute;
