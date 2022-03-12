// Import React
import React from "react";
import {useEffect} from "react";
import store from "../../../store";
import {Navbar, Nav, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

// Import Style
import "./NavUser.scss";
import {toast} from "react-toastify";
import Icon from "../../../img/Icon1.png";
import IconChat from "../../../img/chat-icon.png";
import User from "../../../img/user.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";

// Import API
import {setAuthToken, checkUser} from "../../../config";

function UserDropdown() {
  const logoutSession = () => {
    store.dispatch({
      type: "LOGOUT",
      isLogin: false,
      user: {
        email: "",
        password: "",
      },
    });
    toast.success("Logout success, welcome back anytime", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container>
          <Link to={"/"}>
            <Navbar.Brand href="/">
              <img src={Icon} alt="" />
            </Navbar.Brand>
          </Link>
          <>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="toggle-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-user">
                <Link to={`/message`} className="nav-link">
                  <span className="text-nav-user">
                    <img
                      src={IconChat}
                      alt="icon-chat"
                      width={28}
                      className="icon-nav-user"
                    />
                    Chat
                  </span>
                </Link>
                <Link to={`/payment`} className="nav-link">
                  <span className="text-nav-user">
                    <img
                      src={Payment}
                      alt="icon-payment"
                      width={28}
                      className="icon-nav-user"
                    />
                    Payment
                  </span>
                </Link>
                <Link to={"/profile"} className="nav-link">
                  <span className="text-nav-user">
                    <img
                      src={User}
                      alt="icon-profile"
                      width={25}
                      className="icon-nav-user"
                    />
                    Profile
                  </span>
                </Link>
                <Link to={`/`} className="nav-link">
                  <span className="text-nav-user" onClick={logoutSession}>
                    <img
                      src={Logout}
                      alt="icon-chat"
                      width={25}
                      className="icon-nav-user"
                    />
                    Logout
                  </span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </>
        </Container>
      </Navbar>
    </>
  );
}

export default UserDropdown;
