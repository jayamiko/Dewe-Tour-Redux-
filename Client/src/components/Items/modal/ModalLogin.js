// Import React
import {useState, useEffect} from "react";
import PropTypes from "prop-types";

// Import Libraries
import {useNavigate} from "react-router-dom";
import {useSelector, connect} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";

// Import Components
import {handleLogin} from "../../../actions/auth";
import {Button, Modal, Form} from "react-bootstrap";
// import GoogleLoginBtn from "../../Button/GoogleLogin/GoogleLogin";

// Import API
import {setAuthToken} from "../../../config/api";
import {toast} from "react-toastify";

const Login = ({
  handleLogin,
  auth: {error, isLoading},
  openModalLogin,
  closeModalLogin,
  openModalRegister,
  modal,
}) => {
  let navigate = useNavigate();

  const isLoginSession = useSelector((state) => state.isLogin);

  const checkAuth = () => {
    if (isLoginSession) {
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Format").required("Required!"),
      password: Yup.string()
        .min(7, "Minimum 7 Characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
      if (isLoginSession) {
        closeModalLogin();
        checkAuth();
        toast.success("Login Success");
      } else {
        toast.error("Login Failed");
      }
    },
  });

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return (
    <>
      <Modal show={modal}>
        <Modal.Body className="modal-content">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeModalLogin}
          ></button>
          <h2 className="text-center my-5">Login</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                id="email"
                required
              />
              {formik.errors.email && formik.touched.email && (
                <p style={{color: "red"}}>{formik.errors.email}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                name="password"
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                id="password"
                required
              />
              {formik.errors.password && formik.touched.password && (
                <p style={{color: "red"}}>{formik.errors.password}</p>
              )}
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
              {/* <GoogleLoginBtn /> */}
              <small className="text-center">
                Don't have an account ? click{" "}
                <a onClick={openModalRegister} href="#register">
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
