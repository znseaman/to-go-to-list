import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

export default () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        Sign In
      </Header>
      <Segment>
        <Form size="large">
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Email address"
          ></Form.Input>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
          ></Form.Input>
          <Button color="blue" fluid size="large">
            Sign In
          </Button>
        </Form>
      </Segment>
      <Message>
        Not registered yet? <a href="/create_account">Create Account</a>
      </Message>
    </Grid.Column>
  </Grid>
);
