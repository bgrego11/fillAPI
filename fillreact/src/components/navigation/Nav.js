import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Spinner,
  // NavbarText
} from 'reactstrap';
import LoginButton from '../AuthLoginButton';
import LogoutButton from '../AuthLogoutButton';
import AuthWrapper from '../AuthWrapper';
import { Link } from 'react-router-dom';
import FB_SVG from '../../assets/FB_SVG';
import INSTAGRAM_SVG from '../../assets/INSTAGRAM_SVG';
import FB_SVG_FEATHER from '../../assets/FB_SVG_FEATHER';
import INSTAGRAM_SVG_FEATHER from '../../assets/INSTAGRAM_SVG_FEATHER';


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  // const { isAuthenticated, isLoading } = useAuth0();

  return (
    // <Navbar color="#fff" light expand="md">
    <Navbar color="#fff" light expand="md" fixed="top" style={{ background: "white" }}>
      <NavbarBrand tag={Link} to="/">
        <span className="same-logo" href="https://thefill.org/"><img className=" preload-me" src="https://thefill.org/wp-content/uploads/2019/02/The-Fill-just-words-800x800-2.png" srcSet="https://thefill.org/wp-content/uploads/2019/02/The-Fill-just-words-800x800-2.png 150w, https://thefill.org/wp-content/uploads/2019/02/The-Fill-just-words-800x800-2.png 150w" width="100" height="100" sizes="150px" alt="The Fill" ></img>
        </span></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/series">Series List</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/donate">Donate</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/fillsisters">FillSisters</NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>

          <NavItem >
            <NavLink style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.facebook.com/thefillapp" rel="noopener noreferrer" target="_blank">
              <FB_SVG color="rgb(66,103,178)" size="24" />
            </NavLink>
          </NavItem>
          {/* <NavItem >
            <NavLink style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.facebook.com/thefillapp" rel="noopener noreferrer" target="_blank">
              <FB_SVG_FEATHER color="rgb(66,103,178)" size="24" />
            </NavLink>
          </NavItem> */}
          <NavItem >
            <NavLink style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.instagram.com/christine_thefill/" rel="noopener noreferrer" target="_blank">
              <INSTAGRAM_SVG color="rgb(253,29,29)" size="24" />
            </NavLink>
          </NavItem>
          <NavItem>
            <AuthWrapper>
              <LoginButton /><LogoutButton />
            </AuthWrapper>
          </NavItem>
          {/* <NavItem >
            <NavLink style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.instagram.com/christine_thefill/" rel="noopener noreferrer" target="_blank">
              <INSTAGRAM_SVG_FEATHER color="rgb(253,29,29)" size="24" />
            </NavLink>
          </NavItem> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavBar;