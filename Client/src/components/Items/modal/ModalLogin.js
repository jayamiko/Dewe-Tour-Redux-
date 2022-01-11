// Import React
import {useState} from "react";
import store from "../../../store";

// Import Style
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API
import {API, setAuthToken} from "../../../config/api";
import {checkUser} from "../../../config/auth";

toast.configure();

export default function Login({show, handleClose, handleSwitch}) {
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setInputLogin((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const loginSession = async (event) => {
    try {
      event.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(inputLogin);

      const response = await API.post("./login", body, config);

      if (response?.status === 200) {
        toast.success("Login success, welcome " + response.data.data.name);
        store.dispatch({
          type: "LOGIN",
          payload: response.data.data,
        });
        setAuthToken(response.data.data.token);
      }
      checkUser();
    } catch (error) {
      console.log(error);
      toast.error(`Login Failed`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleEnterPressed = (e) => {
    if (e.keyCode === 13) {
      loginSession();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4" style={{width: 416}}>
        <h4 className="text-center mt-2 mb-4 fw-bold fs-3">Login</h4>
        <form action="" onSubmit={loginSession} onKeyDown={handleEnterPressed}>
          <label htmlFor="emailLogin" className="fw-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mb-4 form-control"
            onChange={handleLoginChange}
            value={inputLogin.email}
          />
          <label htmlFor="password" className="fw-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mb-4 form-control"
            onChange={handleLoginChange}
            value={inputLogin.password}
          />
          <button
            type="submit"
            className="btn btn-primary text-white w-100 fw-bold mb-3"
          >
            Login
          </button>
          <div className="tag-line text-muted text-center">
            Don't have an account?{" "}
            <span
              className="link text-primary text-decoration-underline"
              onClick={handleSwitch}
            >
              Click here
            </span>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
