import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./App.css";

import Menu from "./Menu";
import Home from "./Home";
import AuthForm from "./AuthForm";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Menu />
      <Container>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signin" component={AuthForm} />
          <Route path="/create_account" component={AuthForm} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
