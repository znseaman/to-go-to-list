import React from "react";
import { Container, Image, Menu, MenuItem } from "semantic-ui-react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { client } from "../Client";

function MenuComponent() {
  return (
    <Menu>
      <Container>
        <MenuItem as={Link} to={'/'} header>
          <FontAwesomeIcon icon={faGlobeAmericas} size="5x"></FontAwesomeIcon>
        </MenuItem>

        <MenuItem as="h3" header>
          To Go To List
        </MenuItem>

        <Menu.Menu position="right">
          {
            !client.isSignedIn() && <MenuItem as={Link} to={'/signin'}>
              Sign In
          </MenuItem>
          }
          {
            !client.isSignedIn() && <MenuItem as={Link} to={'/create_account'}>
              Create Account
          </MenuItem>
          }
          {client.isSignedIn() && <MenuItem as={Link} to={'/settings'}>
            Settings
          </MenuItem>}
          {client.isSignedIn() && <MenuItem as={Link} to={'/'} onClick={() => {
            client.signOut();
            return <Redirect to="/" />;
          }}>
            Sign Out
          </MenuItem>}
          {/* {client.isSignedIn() && <MenuItem as="a" header>
            <Image
              src="https://media.licdn.com/dms/image/C4E03AQF1a3nJPjpMow/profile-displayphoto-shrink_100_100/0?e=1577923200&v=beta&t=mYeQh7WmLGu7m9YRtYHKi6nzaTF-F_c7B-1MsWZE8-c"
              width="68"
              height="68"
              circular
            />
          </MenuItem>} */}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default withRouter(MenuComponent);