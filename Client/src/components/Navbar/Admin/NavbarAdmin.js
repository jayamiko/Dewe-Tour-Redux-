// Import React
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import store from "../../../store";

// Import Style
import "./NavAdmin.scss";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "../../../img/Icon1.png";
import IconChat from "../../../img/chat-icon.png";
import TransactionIcon from "../../../img/icontrans.png";
import Stats from "../../../img/stats.png";
import AddData from "../../../img/add-data.png";
import Logout from "../../../img/logout.png";

// Import API
import {checkUser} from "../../../config/auth";
import {setAuthToken} from "../../../config/api";

toast.configure();

function NavbarAdmin() {
  let navigate = useNavigate();
  const logoutSession = () => {
    store.dispatch({
      type: "LOGOUT",
    });

    navigate("/");
    window.location.reload();
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
          <Navbar.Brand href="/">
            <img src={Icon} alt="" />
          </Navbar.Brand>
          <>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              style={{border: "solid 1px whitesmoke"}}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-admin">
                <Nav.Link eventKey={1} href="/message">
                  <span className="text-nav-admin">
                    <img
                      src={IconChat}
                      alt="icon-chat"
                      width={30}
                      className="icon-nav-admin"
                    />
                    Chat
                  </span>
                </Nav.Link>
                <Nav.Link eventKey={2} href="/add-trip">
                  <span className="text-nav-admin">
                    <img
                      src={AddData}
                      alt="icon-add"
                      width={26}
                      className="icon-nav-admin"
                    />
                    Add Trip
                  </span>
                </Nav.Link>
                <Nav.Link eventKey={3} href="/list-transaction">
                  <span className="text-nav-admin">
                    <img
                      src={TransactionIcon}
                      alt="icon-transaction"
                      width={28}
                      className="icon-nav-admin"
                    />
                    Add Trip
                  </span>
                </Nav.Link>
                <Nav.Link href="/stats">
                  <span eventKey={4} className="text-nav-admin">
                    <img
                      src={Stats}
                      alt="icon-statistik"
                      width={33}
                      className="icon-nav-admin"
                    />
                    Statistik
                  </span>
                </Nav.Link>
                <Nav.Link eventKey={5} href="/" onClick={logoutSession}>
                  <span className="text-nav-admin">
                    <img
                      src={Logout}
                      alt="icon-chat"
                      width={25}
                      className="icon-nav-admin"
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

export default NavbarAdmin;
