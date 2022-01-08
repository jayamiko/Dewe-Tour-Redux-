// Import React
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {handleLogin} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// Import Style
import {Button, Modal, Form} from "react-bootstrap";
import GoogleLoginBtn from "../../components/Button/GoogleLogin";
import Palm from "../../img/palm1.png";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API
import {setAuthToken} from "../../config/api";
import {checkUser} from "../../actions/auth";

toast.configure();

const Login = ({handleLogin, auth: {error, isLoading}}) => {
  const history = useHistory();

  const isLoginSession = useSelector((state) => state.isLogin);
  const [modal, setModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const checkAuth = () => {
    if (isLoginSession) {
      history.push("/");
    }
  };
  checkAuth();

  const openModalLogin = () => {
    setModal(true);
    setRegisterModal(false);
  };
  const openModalRegister = () => {
    setRegisterModal(true);
    setModal(false);
  };
  const closeModalLogin = () => setModal(false);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formLogin;

  const LoginHandleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
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
      {error === null || isLoading ? (
        ""
      ) : (
        <p style={{textTransform: "capitalize", margin: "0 0"}}>{error}</p>
      )}
      <button onClick={openModalLogin} className="btn-login" href>
        Login
      </button>
      <Modal show={modal}>
        <Modal.Body className="modal-content">
          <img src={Palm} alt=""></img>
          <h2 className="text-center my-5">Login</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeModalLogin}
          ></button>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={(e) => LoginHandleChange(e)}
                type="email"
                value={email}
                id="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                name="password"
                onChange={(e) => LoginHandleChange(e)}
                type="password"
                required
                id="password"
              />
            </Form.Group>
            <div class="d-flex flex-column gap-2 ">
              <Button
                className="text-white fw-bold"
                variant="warning"
                type="submit"
                required
              >
                Submit
              </Button>
              <GoogleLoginBtn />
              <small className="text-center">
                Don't have an account ? click{" "}
                <a onClick={openModalRegister} href="">
                  Here
                </a>
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {handleLogin})(Login);
