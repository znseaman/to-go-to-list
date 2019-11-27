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
        Create Account
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
            Create Account
          </Button>
        </Form>
      </Segment>
      <Message>
        Already registered? <a href="/login">Login</a>
      </Message>
    </Grid.Column>
  </Grid>
);
