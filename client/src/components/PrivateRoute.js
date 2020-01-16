import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { client } from '../Client';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    client.isSignedIn() ? (
      React.createElement(Component, props)
    ) : (
        <Redirect to='/signin' />
      )
  )} />
);

export default PrivateRoute;