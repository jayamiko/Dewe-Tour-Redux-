// Import React
import React, {useEffect} from "react";
import PropTypes from "prop-types";

// Import Libraries
import {connect} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";

// Import Components
import {handleLogin} from "../../../../actions/auth";
import {Button, Modal, Form} from "react-bootstrap";

// Import API
import {setAuthToken} from "../../../../config";

const Login = ({
  handleLogin,
  auth: {error, isLoading},
  openModalLogin,
  closeModalLogin,
  openModalRegister,
  modal,
  setModal,
}) => {
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
      handleLogin(values.email, values.password, closeModalLogin);
      setTimeout(() => {
        formik.setSubmitting(false);
      }, 2000);
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
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
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
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
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
                disabled={formik.isSubmitting}
                required
              >
                Submit
              </Button>
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
