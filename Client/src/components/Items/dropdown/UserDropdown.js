// Import React
import React from "react";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
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
  let history = useHistory();
  const logoutSession = () => {
    store.dispatch({
      type: "LOGOUT",
      isLogin: false,
      user: {
        email: "",
        password: "",
      },
    });

    history.push("/");
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
      <Navbar expand="lg" style={{paddingRight: "50px"}}>
        <div style={{paddingLeft: "50px"}}></div>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{background: "white", marginTop: "20px"}}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
          <Nav className="me-auto">
            <Nav.Link href="#chat">
              <Link to="/message" style={{textDecoration: "none"}}>
                <div className="nav-item-user1" style={{color: "white"}}>
                  <img src={IconChat} width={45} alt=""></img>
                  Chat
                </div>
              </Link>
            </Nav.Link>
            <Nav.Link href="#profile">
              <Link to="/profile" style={{textDecoration: "none"}}>
                <div className="nav-item-user2" style={{color: "white"}}>
                  <img src={User} alt=""></img>
                  Profile
                </div>
              </Link>
            </Nav.Link>
            <Nav.Link href="#payment">
              <Link to="/payment" style={{textDecoration: "none"}}>
                <div className="nav-item-user3" style={{color: "white"}}>
                  <img src={Payment} alt=""></img>
                  Payment
                </div>
              </Link>
            </Nav.Link>
            <Nav.Link href="#logout">
              <Link onClick={logoutSession} style={{textDecoration: "none"}}>
                <div className="nav-item-user4" style={{color: "white"}}>
                  <img src={Logout} alt=""></img>
                  Logout
                </div>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default UserDropdown;
