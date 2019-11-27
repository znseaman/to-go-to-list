import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./App.css";

import Menu from "./Menu";
import Home from "./Home";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";

function App() {
  return (
    <Router>
      <Menu />
      <Container>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/create_account" component={CreateAccount}></Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
