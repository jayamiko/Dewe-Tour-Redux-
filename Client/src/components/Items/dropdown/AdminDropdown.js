// Import React
import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import store from "../../../store";

// Import Style
import "./DropdownComp.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../../../img/logout.png";
import Icon from "../../../img/Icon1.png";
import {Navbar, Nav} from "react-bootstrap";

// Import API
import {checkUser} from "../../../actions/auth";
import {setAuthToken} from "../../../config/api";

toast.configure();

function AdminDropdown() {
  const history = useHistory();
  const logoutSession = () => {
    store.dispatch({
      type: "LOGOUT",
    });

    history.push("/");
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
      <div className="background-nav">
        <Navbar expand="lg" className="container-navbar-user">
          <Navbar.Brand href="/">
            <Link to="/">
              <img src={Icon} alt="icon-dewetour" className="icon-dewetour" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{background: "white"}}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" className="nav-item-admin">
              <Nav.Link href="#transaction" className="nav-link">
                <Link to="/list-transaction" style={{textDecoration: "none"}}>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{color: "white"}}
                  >
                    <img src="/assets/journey1.png" alt=""></img>
                    Transations
                  </div>
                </Link>
              </Nav.Link>
              <Nav.Link href="#logout" className="nav-link">
                <Link onClick={logoutSession} style={{textDecoration: "none"}}>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{color: "white"}}
                  >
                    <img src={Logout} alt=""></img>
                    Logout
                  </div>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default AdminDropdown;
