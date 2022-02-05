// Import React
import {useState} from "react";
import {handleRegister} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import GoogleLoginBtn from "../Button/GoogleLogin";

// Import Style
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Palm from "../../img/palm.png";
import {Button, Modal, Form} from "react-bootstrap";

toast.configure();

const Register = ({handleRegister, auth: {error, isLoading}}) => {
  const [modal, setModal] = useState(false); //Modal Login
  const [registerModal, setRegisterModal] = useState(false); //Modal Register

  // Form Register
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const openModalLogin = () => {
    setModal(true);
    setRegisterModal(false);
  };
  const openModalRegister = () => {
    setRegisterModal(true);
    setModal(false);
  };
  const closeModalRegister = () => setRegisterModal(false);

  const registerHandleChange = (e) => {
    setFormRegister({...formRegister, [e.target.name]: e.target.value});
  };

  const {email, password, name, phone, address} = formRegister;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password, name, phone, address, closeModalRegister());
  };

  return (
    <>
      <Modal show={registerModal}>
        <Modal.Body className="modal-content">
          <img src={Palm} alt=""></img>
          <h2 className="text-center my-5">Register</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeModalRegister}
            required
          ></button>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Label className="fw-bold">FullName</Form.Label>
              <Form.Control
                name="name"
                onChange={(e) => registerHandleChange(e)}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                onChange={(e) => registerHandleChange(e)}
                type="email"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                onChange={(e) => registerHandleChange(e)}
                type="password"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPhone">
              <Form.Label className="fw-bold">Phone</Form.Label>
              <Form.Control
                onChange={(e) => registerHandleChange(e)}
                name="phone"
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPhone">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                onChange={(e) => registerHandleChange(e)}
                name="address"
                type="text"
                required
              />
            </Form.Group>
            <div class="d-flex flex-column gap-2 ">
              <Button
                className="text-white fw-bold"
                variant="warning"
                type="submit"
                onChange={(e) => registerHandleChange(e)}
                required
              >
                Submit
              </Button>
              <small className="text-center">
                Have an account ? click{" "}
                <a onClick={openModalLogin} href="">
                  Here
                </a>
              </small>
              <GoogleLoginBtn />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <span>
        <button
          className="btn-register"
          onClick={openModalRegister}
          href="#services"
        >
          Register
        </button>
      </span>
    </>
  );
};

Register.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {handleRegister})(Register);
