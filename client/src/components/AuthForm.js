import React from "react";
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Loader,
  Label,
  Input,
} from "semantic-ui-react";
import { client } from "../Client";
import { checkValidity } from "../shared/utility";

const AuthForm = () => {
  const [formState, setFormState] = React.useState({
    loginInProgress: false,
    shouldRedirect: false,
    hasError: false,
    errorMessage: '',
  });
  const initialData = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [data, setData] = React.useState(initialData);

  const [emailLabel, setEmailLabel] = React.useState('hidden');
  const [emailValid, setEmailValid] = React.useState(false);
  const [confirmLabel, setConfirmLabel] = React.useState('hidden');
  const [confirmValid, setConfirmValid] = React.useState(false);

  const signInRoute = "/signin";
  const createAccountRoute = "/create_account";
  const hasAccount = useRouteMatch(signInRoute);
  const authRoute = hasAccount ? signInRoute : createAccountRoute;
  const submit = client.authenticate.bind(client, authRoute);
  const CREATE = 'Create Account';
  const SIGN = 'Sign In';

  const handleSubmit = async e => {
    e.preventDefault();
    setFormState({ ...formState, loginInProgress: true });
    const { email, password, confirmPassword } = data;

    // basic login validation
    if (!hasAccount) {
      // create account validation
      if (password.length < 0 || confirmPassword.length < 0 || password != confirmPassword || email.length < 0) {
        setFormState({ ...formState, loginInProgress: false });
        return false;
      }
    } else if (hasAccount) {
      // sign in validation
      if (email.length < 0 && password.length < 0) {
        setFormState({ ...formState, loginInProgress: false });
        return false;
      }
    }

    try {
      await submit({ email, password })
        .then(res => {
          setFormState({ ...formState, shouldRedirect: true });
        })
        .catch(err => {
          if (err.response.status >= 400 && err.response.status < 500) {
            setFormState({ ...formState, loginInProgress: false, hasError: true, errorMessage: err.response.data.message });
          } else if (err.response.status == 500) {
            setFormState({ ...formState, loginInProgress: false, hasError: true, errorMessage: 'Internal Server Error' });
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleBlur = e => {
    const { name: field, value } = e.target;
    if (field == 'email') {
      const valid = checkValidity(value, { required: true, valid: false, isEmail: true });
      setEmailLabel(valid ? 'hidden' : '');
      setEmailValid(valid);
    } else if (field == 'confirmPassword') {
      const { password, confirmPassword } = data;
      const match = password == confirmPassword;
      setConfirmLabel(match ? 'hidden' : '');
      setConfirmValid(match);
    }
  }

  if (formState.shouldRedirect) {
    return <Redirect to="/" />;
  }

  return <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        {hasAccount ? SIGN : CREATE}
      </Header>
      <Segment>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              fluid
              icon="at"
              color="red"
              iconPosition="left"
              placeholder="Email address"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={emailValid}
            ></Input>
            <Label pointing prompt className={emailLabel}>
              Please enter a valid email
            </Label>
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              required
            ></Input>
            <Label pointing prompt className="hidden">
              Please enter a value
            </Label>
          </Form.Field>
          {
            !hasAccount &&
            <Form.Field>
              <Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={confirmValid}
              ></Input>
              <Label pointing prompt className={confirmLabel}>
                Please enter matching passwords
              </Label>
            </Form.Field>
          }
          {formState.loginInProgress ? <Loader active inline='centered' /> : <Button color="blue" fluid size="large">
            {hasAccount ? SIGN : CREATE}
          </Button>}
        </Form>
      </Segment>
      {formState.hasError &&
        <Segment inverted color='red'>
          {formState.errorMessage}
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

export default AuthForm;