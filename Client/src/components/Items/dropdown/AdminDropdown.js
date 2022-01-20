// Import React
import React, {useEffect} from "react";
import {useNavigate, NavLink} from "react-router-dom";
import store from "../../../store";

// Import Style
import "./DropdownComp.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconChat from "../../../img/chat-icon.png";
import Logout from "../../../img/logout.png";
import Header from "../../../img/Header.png";
import {Navbar, Nav} from "react-bootstrap";

// Import API
import {checkUser} from "../../../config/auth";
import {setAuthToken} from "../../../config/api";

toast.configure();

function AdminDropdown() {
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
      <div className="navbar-admin"></div>
      <Navbar expand="lg">
        <div style={{paddingLeft: "50px"}}></div>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="toggle-admin"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
          <Nav className="me-auto">
            <NavLink to="/admin-message" className="nav-link">
              <div className="nav-item-user2-admin" style={{color: "white"}}>
                <img src={IconChat} alt=""></img>
                <span style={{marginLeft: "10px"}}>Chat</span>
              </div>
            </NavLink>
            <NavLink to="/list-transaction" className="nav-link">
              <div className="nav-item-user2-admin" style={{color: "white"}}>
                <img src="/assets/journey1.png" alt=""></img>
                <span style={{marginLeft: "10px"}}>Transations</span>
              </div>
            </NavLink>
            <div onClick={logoutSession} className="nav-link">
              <div className="nav-item-user3-admin" style={{color: "white"}}>
                <img src={Logout} alt=""></img>
                <span style={{marginLeft: "10px"}}>Logout</span>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default AdminDropdown;
