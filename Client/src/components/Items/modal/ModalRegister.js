// Import React
import {useState} from "react";
import PropTypes from "prop-types";

// Import Libraries
import {connect} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";

// Import Components
import {Button, Modal, Form} from "react-bootstrap";
import {handleRegister} from "../../../actions/auth";
import PhoneInput from "../../Button/Input/InputPhone";
// import GoogleLoginBtn from "../../Button/GoogleLogin/GoogleLogin";

// Import Style
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Register = ({
  handleRegister,
  openModalLogin,
  closeModalRegister,
  register,
  auth: {error, isLoading},
}) => {
  const [phone, setPhone] = useState("");

  const formik = useFormik({
    // initial values
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "Male",
      address: "",
    },
    // validation schema
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email("Invalid email format"),
      password: Yup.string()
        .required()
        .min(7, "Should more than 7 characters")
        .matches(/[a-z]/g, "Should contain at least 1 lowercase")
        .matches(/[A-Z]/g, "Should contain at least 1 uppercase")
        .matches(/[0-9]/g, "Should contain at least 1 number"),
      gender: Yup.string().required(),
      // phone: Yup.string()
      // .required("This field is Required")
      // .matches(
      //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      //   "Phone number is not valid"
      // ),
      address: Yup.string()
        .min(10, "Should more than 10 characters")
        .required(),
    }),
    // handle submission
    onSubmit: (values) => {
      handleRegister(
        values.name,
        values.email,
        values.password,
        values.gender,
        phone,
        values.address,
        closeModalRegister()
      );
      formik.setSubmitting(false);
      formik.resetForm();
    },
  });

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
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Label className="fw-bold">FullName</Form.Label>
              <Form.Control
                name="name"
                type="text"
                {...formik.getFieldProps("name")}
                required
              />
              {formik.errors.name && formik.touched.name && (
                <p style={{color: "red"}}>{formik.errors.name}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
                required
              />
              {formik.errors.email && formik.touched.email && (
                <p style={{color: "red"}}>{formik.errors.email}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                {...formik.getFieldProps("password")}
                required
              />
              {formik.errors.password && formik.touched.password && (
                <p style={{color: "red"}}>{formik.errors.password}</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bold">Gender</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="gender"
                {...formik.getFieldProps("gender")}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
              {formik.errors.gender && formik.touched.gender && (
                <p style={{color: "red"}}>{formik.errors.gender}</p>
              )}
            </Form.Group>
            <div>
              <PhoneInput name="phone" value={phone} setValue={setPhone} />
              {phone === "" && (
                <p style={{color: "red"}}>{"Phone is Required!"}</p>
              )}
            </div>
            <Form.Group className="mb-4" controlId="formBasicPhone">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                {...formik.getFieldProps("address")}
                required
              />
              {formik.errors.address && formik.touched.address && (
                <p style={{color: "red"}}>{formik.errors.address}</p>
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
