// Import React
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import store from "../../store";
import {useSelector} from "react-redux";

// Import Style
import {Button, Modal, Form} from "react-bootstrap";
import Palm from "../../img/palm1.png";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API
import {API, setAuthToken} from "../../config/api";
import {checkUser} from "../../actions/auth";

toast.configure();

export default function Login() {
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

  const loginSession = async (event) => {
    try {
      event.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(formLogin);

      const response = await API.post("/login", body, config);

      if (response?.status === 200) {
        toast.success("Login Success", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        store.dispatch({
          type: "LOGIN",
          payload: response.data.data,
        });

        setAuthToken(response.data.data.token);
      }

      checkUser();
    } catch (error) {
      console.log(error);
      toast.error("Login Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
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
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={LoginHandleChange}
                type="email"
                id="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                name="password"
                onChange={LoginHandleChange}
                type="password"
                required
                id="password"
              />
            </Form.Group>
            <div class="d-flex flex-column gap-2 ">
              <Button
                onClick={loginSession}
                className="text-white fw-bold"
                variant="warning"
                type="submit"
                required
              >
                Submit
              </Button>
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
}
