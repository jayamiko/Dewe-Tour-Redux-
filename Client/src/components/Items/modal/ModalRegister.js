// Import React
import {useState} from "react";
import {handleRegister} from "../../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// import GoogleLoginBtn from "../../Button/GoogleLogin/GoogleLogin";

// Import Style
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Button, Modal, Form} from "react-bootstrap";
import PhoneInput from "../../Button/Input/InputPhone";
toast.configure();

const Register = ({
  handleRegister,
  openModalLogin,
  closeModalRegister,
  register,
  auth: {error, isLoading},
}) => {
  const [phone, setPhone] = useState("");
  // Form Register
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    address: "",
  });

  const registerHandleChange = (e) => {
    setFormRegister({...formRegister, [e.target.name]: e.target.value});
  };

  const {email, password, name, gender, address} = formRegister;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(
      email,
      password,
      name,
      gender,
      phone,
      address,
      closeModalRegister()
    );
  };

  return (
    <>
      <Modal show={register}>
        <Modal.Body className="modal-content">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeModalRegister}
            required
          ></button>
          <h2 className="text-center my-5">Register</h2>
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
            <Form.Group>
              <Form.Label className="fw-bold">Gender</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => registerHandleChange(e)}
                type="text"
                name="country"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <div>
              <PhoneInput name="phone" value={phone} setValue={setPhone} />
            </div>
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
              {/* <GoogleLoginBtn /> */}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
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
