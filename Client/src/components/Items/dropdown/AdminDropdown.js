// Import React
import React, {useEffect} from "react";
import {useNavigate, NavLink} from "react-router-dom";
import store from "../../../store";

// Import Style
import "./DropdownComp.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconChat from "../../../img/chat-icon.png";
import Statistik from "../../../img/statistik.png";
import Stats from "../../../img/stats.png";
import AddData from "../../../img/add-data.png";
import Logout from "../../../img/logout.png";
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
              <div className="nav-item-user1-admin">
                <img src={IconChat} alt="" width={50}></img>
                <span style={{marginLeft: "10px"}}>Chat</span>
              </div>
            </NavLink>
            <NavLink to="/add-trip" className="nav-link">
              <div className="nav-item-user2-admin">
                <img src={AddData} alt="" width={30}></img>
                <span style={{marginLeft: "10px"}}>Add Trip</span>
              </div>
            </NavLink>
            <NavLink to="/list-transaction" style={{textDecoration: "none"}}>
              <div className="nav-item-user3-admin">
                <img src="/assets/journey1.png" alt=""></img>
                <span style={{marginLeft: "10px"}}>Transations</span>
              </div>
            </NavLink>
            <NavLink to="/stats" style={{textDecoration: "none"}}>
              <div className="nav-item-user4-admin">
                <img src={Stats} alt="" width="50"></img>
                <span style={{marginLeft: "10px"}}>Statistik</span>
              </div>
            </NavLink>
            <div onClick={logoutSession} style={{cursor: "pointer"}}>
              <div className="nav-item-user5-admin">
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
