import {API, setAuthToken} from "../config/api";
import store from "../store";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const checkUser = async () => {
  try {
    const response = await API.get("/check-auth");

    if (response.status !== 200) {
      return store.dispatch({
        type: "AUTH_ERROR",
      });
    }

    let payload = response.data.data.user;

    payload.token = localStorage.token;

    store.dispatch({
      type: "AUTH_SUCCESS",
      payload,
    });
  } catch (error) {
    store.dispatch({
      type: "STOP_LOADING",
    });
  }
};

//Register User
export const handleRegister =
  (email, password, name, phone, address, registerModal) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
      name,
      phone,
      address,
    });

    try {
      const response = await API.post("/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.data,
      });

      dispatch(checkUser());
      registerModal();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
