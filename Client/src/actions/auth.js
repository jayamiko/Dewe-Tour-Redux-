import {API, setAuthToken} from "../config";
import {toast} from "react-toastify";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";
export const UPDATE_USER_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_PROFILE_FAIL";
export const LOGIN_GOOGLE_SUCCESS = "LOGIN_GOOGLE_SUCCESS";
export const LOGIN_GOOGLE_FAIL = "LOGIN_GOOGLE_FAIL";

export const checkUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await API.get("/check-auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const handleRegister =
  ({authGoogle}, setRegister, setPhone, token) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      setAuthToken(token);
    }

    const body = JSON.stringify({
      ...authGoogle,
    });

    try {
      const response = await API.post("/register", body, config);
      toast.success("Register is Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      setPhone("");
      setRegister(false);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.user,
      });
      // dispatch(checkUser());
    } catch (error) {
      console.log({error});
      const message =
        error.response.data.message.message === undefined
          ? "Login Failed"
          : error.response.data.message.message;
      toast.warning(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      dispatch({
        type: REGISTER_FAIL,
        payload: message,
      });
    }
  };

export const handleLogin =
  (email, password, closeModalLogin) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({email, password});

    try {
      const response = await API.post("/login", body, config);
      if (response.status === 200) {
        toast.success("Login is Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
      closeModalLogin();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.user,
      });
    } catch (err) {
      console.log({err});
      toast.error("Email or Password is Incorrect", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const saveProfile =
  (form, isEditable, setIsEditable, setLoadingAfterEdit) =>
  async (dispatch) => {
    setIsEditable(true);
    setLoadingAfterEdit(true);

    const notification = (res) => {
      toast.success(res?.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    };
    try {
      if (typeof form.photo === "object") {
        const formData = new FormData();
        formData.set("name", form.name);
        formData.set("email", form.email);
        formData.set("gender", form.gender);
        formData.set("phone", form.phone);
        formData.set("address", form.address);
        formData.set("photo", form.photo[0], form.photo[0].filename);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const body = formData;

        const response = await API.patch("/user", body, config);

        notification(response);
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: response.data,
        });

        // Set Loading
        const timer = setTimeout(() => {
          setLoadingAfterEdit(false);
          setIsEditable(false);
        }, 2000);

        checkUser();
        return () => clearTimeout(timer);
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = form;

        const response = await API.patch("/user/specific", body, config);

        notification(response);

        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: response.data,
        });
      }
      // Set Loading
      const timer = setTimeout(() => {
        setLoadingAfterEdit(false);
        setIsEditable(false);
      }, 2000);

      checkUser();
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    }
  };
