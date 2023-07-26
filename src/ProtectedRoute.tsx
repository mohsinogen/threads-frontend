// ProtectedRoute.tsx

import React, { ComponentType, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AuthContext from './context/AuthContext';

interface ProtectedRouteProps extends RouteProps {
    component: ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  // Check if the user is authenticated or not
  const isAuthenticated = !!authContext.user;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
