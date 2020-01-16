import React from "react";
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { client } from "../Client"

const CreateAccount = () => {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    loginInProgress: false,
    shouldRedirect: false,
  };
  const [data, setData] = React.useState(initialState);

  const signInRoute = "/signin";
  const createAccountRoute = "/create_account";
  const hasAccount = useRouteMatch(signInRoute);
  const submit = hasAccount ? client.signIn.bind(client) : client.createAccount.bind(client);
  const CREATE = 'Create Account';
  const SIGN = 'Sign In';

  const handleSubmit = async e => {
    e.preventDefault();
    setData({ ...data, loginInProgress: true });
    const { email, password, confirmPassword } = data;
    // TODO: validate fields

    try {
      await submit({ email, password });
      setData({ ...data, shouldRedirect: true });
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  if (data.shouldRedirect) {
    return <Redirect to="/" />;
  }

  return <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        {hasAccount ? SIGN : CREATE}
      </Header>
      <Segment>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Email address"
            name="email"
            onChange={handleChange}
          ></Form.Input>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
          ></Form.Input>
          {
            !hasAccount &&
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            ></Form.Input>
          }
          <Button color="blue" fluid size="large">
            {hasAccount ? SIGN : CREATE}
          </Button>
        </Form>
      </Segment>
      <Message>
        {hasAccount ? 'Not registered yet?' : 'Already registered?'}{' '}
        <Link to={hasAccount ? createAccountRoute : signInRoute}>
          {hasAccount ? CREATE : SIGN}
        </Link>
      </Message>
    </Grid.Column>
  </Grid>
}

export default CreateAccount;