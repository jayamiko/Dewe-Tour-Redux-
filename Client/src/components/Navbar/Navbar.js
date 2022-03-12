// Import React
import {useState} from "react";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

// Import Components
import {ModalLogin, ModalRegister} from "../Items/modal";
import NavbarAdmin from "./Admin/NavbarAdmin";
import NavbarUser from "./User/NavbarUser";

// Import Style
import "./Navbar.scss";
import Icon from "../../img/Icon1.png";
import {Navbar, Nav} from "react-bootstrap";

const NavbarComp = ({auth: {isAuthenticated, user, isLoading}}) => {
  const currentState = useSelector((state) => state.auth);
  const isAdmin = currentState.user.status === "admin";
  const isLogin = currentState.isLogin;

  const [modal, setModal] = useState(false);
  const [register, setRegister] = useState(false);

  const openModalLogin = () => {
    setModal(true);
    setRegister(false);
  };
  const openModalRegister = () => {
    setRegister(true);
    setModal(false);
  };
  const closeModalRegister = () => {
    setRegister(false);
    setModal(false);
  };
  const closeModalLogin = () => setModal(false);

  return (
    <>
      {isAuthenticated && isLogin ? (
        isAuthenticated && isAdmin ? (
          <NavbarAdmin />
        ) : (
          <NavbarUser />
        )
      ) : (
        !isAuthenticated && (
          <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Container>
                <Link to={`/`}>
                  <Navbar.Brand href="/">
                    <img src={Icon} alt="" />
                  </Navbar.Brand>
                </Link>
                <Navbar.Toggle
                  aria-controls="responsive-navbar-nav"
                  style={{border: "solid 1px whitesmoke"}}
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav>
                    <Nav.Link href="#services" onClick={openModalLogin}>
                      <span className="text-nav">Login</span>
                    </Nav.Link>
                    <Nav.Link
                      eventKey={2}
                      href="#services"
                      onClick={openModalRegister}
                    >
                      <span className="text-nav">Register</span>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <ModalLogin
              openModalLogin={openModalLogin}
              openModalRegister={openModalRegister}
              modal={modal}
              setModal={setModal}
              closeModalLogin={closeModalLogin}
            />
            <ModalRegister
              openModalLogin={openModalLogin}
              openModalRegister={openModalRegister}
              register={register}
              setRegister={setRegister}
              closeModalRegister={closeModalRegister}
            />
          </>
        )
      )}
    </>
  );
};

NavbarComp.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NavbarComp);
