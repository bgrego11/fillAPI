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
  NavbarText,
  Container,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import FB_SVG from '../../assets/svg/FB_SVG';
import INSTAGRAM_SVG from '../../assets/svg/INSTAGRAM_SVG';
import LoginInOutButton from '../login/LoginInOutButton';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';

const TheFillNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    // <Navbar color="#fff" light expand="md">
    <Navbar color="#fff" light expand="md" fixed="top" style={{ background: "white" }}>
      <Container>
        <NavbarBrand tag={Link} to="/">
          <span className="same-logo" href="https://thefill.org/"><img className=" preload-me" src="https://thefill.org/wp-content/uploads/2019/02/The-Fill-just-words-800x800-2.png" srcSet="https://thefill.org/wp-content/uploads/2019/02/The-Fill-just-words-800x800-2.png 150w, https://thefill.org/wp-content/uploads/2019/02/The-Fill-just-words-800x800-2.png 150w" width="100" height="100" sizes="150px" alt="The Fill" ></img>
          </span></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/serieslist"><span className="the-fill-nav-link">Series</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/allstories"><span className="the-fill-nav-link">Stories</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/donate"><span className="the-fill-nav-link">Donate</span></NavLink>
            </NavItem>

          </Nav>
          <Nav navbar>

            {
              isAuthenticated ?
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {/* <Media left href="#">
                      <Media object data-src={user.picture} alt="Generic placeholder image" />
                    </Media> */}
                    <img style={{ width: "2rem", height: "2rem", borderRadius: "50%" }} src={user.picture} alt={user.name} />
                    {/* {user.name} */}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/userprofile">
                      profile
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                // <NavItem>
                //   <NavbarText style={{ paddingLeft: "8px", paddingRight: "8px", color: "rgb(162, 81, 87)" }}>{user.name}</NavbarText>
                // </NavItem>
                :
                ""
            }
            <NavItem>
              {
                (!isAuthenticated && <LoginButton />)
                ||
                (isAuthenticated && <LogoutButton />)
              }
            </NavItem>
            <NavItem >
              <NavLink style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.facebook.com/thefillapp" rel="noopener noreferrer" target="_blank">
                {/* <FB_SVG color="rgb(66,103,178)" size="16" /> */}
                <FB_SVG color="rgb(240, 146, 164)" size="16" />
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink style={{ paddingLeft: "8px", paddingRight: "8px" }} href="https://www.instagram.com/christine_thefill/" rel="noopener noreferrer" target="_blank">
                {/* <INSTAGRAM_SVG color="rgb(253,29,29)" size="16" /> */}
                <INSTAGRAM_SVG color="rgb(240, 146, 164)" size="16" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default TheFillNavBar;