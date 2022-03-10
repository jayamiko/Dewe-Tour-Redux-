// Import React
import React, {useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import store from "../../../store";

// Import Style
import "./NavAdmin.scss";
import {toast} from "react-toastify";
import Icon from "../../../img/Icon1.png";
import IconChat from "../../../img/chat-icon.png";
import TransactionIcon from "../../../img/icontrans.png";
import Stats from "../../../img/stats.png";
import AddData from "../../../img/add-data.png";
import Logout from "../../../img/logout.png";

// Import API
import {checkUser} from "../../../config/auth";
import {setAuthToken} from "../../../config/api";

function NavbarAdmin() {
  let navigate = useNavigate();
  const logoutSession = () => {
    store.dispatch({
      type: "LOGOUT",
    });

    navigate("/");
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
      <Navbar collapseOnSelect expand="lg" className="navbar-admin">
        <Container>
          <Link to={`/`}>
            <Navbar.Brand href="/">
              <img src={Icon} alt="icon-brand" />
            </Navbar.Brand>
          </Link>
          <>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="toggle-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-admin">
                <Link to={`/admin-message`} className="nav-link">
                  <span className="text-nav-admin">
                    <img
                      src={IconChat}
                      alt="icon-chat"
                      width={30}
                      className="icon-nav-admin"
                    />
                    Chat
                  </span>
                </Link>
                <Link to={`/add-trip`} className="nav-link">
                  <span className="text-nav-admin">
                    <img
                      src={AddData}
                      alt="icon-add"
                      width={26}
                      className="icon-nav-admin"
                    />
                    Add Trip
                  </span>
                </Link>
                <Link to={`/list-transaction`} className="nav-link">
                  <span className="text-nav-admin">
                    <img
                      src={TransactionIcon}
                      alt="icon-transaction"
                      width={28}
                      className="icon-nav-admin"
                    />
                    Transaction
                  </span>
                </Link>
                <Link to={`/stats`} className="nav-link">
                  <span className="text-nav-admin">
                    <img
                      src={Stats}
                      alt="icon-statistik"
                      width={33}
                      className="icon-nav-admin"
                    />
                    Statistik
                  </span>
                </Link>
                <Link to={`/`} className="nav-link">
                  <span className="text-nav-admin" onClick={logoutSession}>
                    <img
                      src={Logout}
                      alt="icon-chat"
                      width={25}
                      className="icon-nav-admin"
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

export default NavbarAdmin;
