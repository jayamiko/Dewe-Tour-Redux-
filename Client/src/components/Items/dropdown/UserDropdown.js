// Import React
import React from "react";
import {useEffect} from "react";
import {useNavigate, NavLink} from "react-router-dom";
import store from "../../../store";

// Import Style
import "./DropdownComp.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconChat from "../../../img/chat-icon.png";
import User from "../../../img/user 2.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";
import {Navbar, Nav} from "react-bootstrap";

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
      <Navbar expand="lg" className="navbar-user">
        <div style={{paddingLeft: "50px"}}></div>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{background: "white", marginTop: "20px"}}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
          <Nav className="me-auto">
            <NavLink to="/message" className="nav-link">
              <div className="nav-item-user1">
                <img src={IconChat} width={45} alt=""></img>
                <span>Chat</span>
              </div>
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              <div className="nav-item-user2">
                <img src={User} alt=""></img>
                <span>Profile</span>
              </div>
            </NavLink>
            <NavLink to="/payment" className="nav-link">
              <div className="nav-item-user3">
                <img src={Payment} alt=""></img>
                <span>Payment</span>
              </div>
            </NavLink>
            <div
              onClick={logoutSession}
              className="nav-link"
              style={{cursor: "pointer"}}
            >
              <div className="nav-item-user4">
                <img src={Logout} alt=""></img>
                <span>Logout</span>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default UserDropdown;
