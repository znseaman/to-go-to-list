import React from "react";
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Loader
} from "semantic-ui-react";
import { client } from "../Client";

const CreateAccount = () => {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    loginInProgress: false,
    shouldRedirect: false,
    hasError: false,
    errorMessage: ''
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
      await submit({ email, password })
        .then(res => {
          setData({ ...data, shouldRedirect: true });
        })
        .catch(err => {
          if (err.response.status == 401) {
            setData({ ...data, hasError: true, errorMessage: 'Invalid Credentials', loginInProgress: false });
          }
        });
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
          {data.loginInProgress ? <Loader active inline='centered' /> : <Button color="blue" fluid size="large">
            {hasAccount ? SIGN : CREATE}
          </Button>}
        </Form>
      </Segment>
      {data.hasError &&
        <Segment inverted color='red'>
          {data.errorMessage}
        </Segment>
      }
      <Message>
        {hasAccount ? 'Not registered yet?' : 'Already registered?'}{' '}
        <Link to={hasAccount ? createAccountRoute : signInRoute}>
          {hasAccount ? CREATE : SIGN}
        </Link>
      </Message>
    </Grid.Column>
  </Grid >
}

export default CreateAccount;