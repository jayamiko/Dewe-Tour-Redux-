// Import React
import React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import store from "../../../store";
import {Navbar, Nav, Container} from "react-bootstrap";

// Import Style
import "./NavUser.scss";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "../../../img/Icon1.png";
import IconChat from "../../../img/chat-icon.png";
import User from "../../../img/user.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";

// Import API
import {setAuthToken} from "../../../config/api";
import {checkUser} from "../../../config/auth";

toast.configure();

function UserDropdown() {
  let Navigate = useNavigate();
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

    window.location.reload();
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
          <Navbar.Brand href="/">
            <img src={Icon} alt="" />
          </Navbar.Brand>
          <>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              style={{border: "solid 1px whitesmoke"}}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-user">
                <Nav.Link eventKey={1} href="/message">
                  <span className="text-nav-user">
                    <img
                      src={IconChat}
                      alt="icon-chat"
                      width={28}
                      className="icon-nav-user"
                    />
                    Chat
                  </span>
                </Nav.Link>
                <Nav.Link eventKey={2} href="/payment">
                  <span className="text-nav-user">
                    <img
                      src={Payment}
                      alt="icon-payment"
                      width={28}
                      className="icon-nav-user"
                    />
                    Payment
                  </span>
                </Nav.Link>
                <Nav.Link href="/profile">
                  <span eventKey={3} className="text-nav-user">
                    <img
                      src={User}
                      alt="icon-profile"
                      width={25}
                      className="icon-nav-user"
                    />
                    Profile
                  </span>
                </Nav.Link>
                <Nav.Link eventKey={4} href="/" onClick={logoutSession}>
                  <span className="text-nav-user">
                    <img
                      src={Logout}
                      alt="icon-chat"
                      width={25}
                      className="icon-nav-user"
                    />
                    Logout
                  </span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        </Container>
      </Navbar>
    </>
  );
}

export default UserDropdown;
