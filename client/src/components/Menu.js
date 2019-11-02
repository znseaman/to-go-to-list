import React from "react";
import { Container, Image, Menu, MenuItem } from "semantic-ui-react";

export default () => (
  <Menu>
    <Container>
      <MenuItem as="a" header>
        <Image
          src="https://media.licdn.com/dms/image/C4E03AQF1a3nJPjpMow/profile-displayphoto-shrink_100_100/0?e=1577923200&v=beta&t=mYeQh7WmLGu7m9YRtYHKi6nzaTF-F_c7B-1MsWZE8-c"
          width="68"
          height="68"
          circular
        />
      </MenuItem>

      <Menu.Menu position="right">
        <MenuItem as="a" name="login">
          Login
        </MenuItem>

        <MenuItem as="a" name="register">
          Register
        </MenuItem>
      </Menu.Menu>
    </Container>
  </Menu>
);
