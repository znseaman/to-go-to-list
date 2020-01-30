import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { client } from '../Client';
import config from '../config';
let { CLIENT_URL: baseURL } = config;

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