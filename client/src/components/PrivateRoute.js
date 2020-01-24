import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { client } from '../Client';
const { REACT_APP_BASE_URL: baseURL } = process.env;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    client.isSignedIn() ? (
      React.createElement(Component, props)
    ) : (
        <Redirect to={`${baseURL}/signin`} />
      )
  )} />
);

export default PrivateRoute;