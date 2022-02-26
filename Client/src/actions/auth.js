import {API, setAuthToken} from "../config/api";
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
  (name, email, password, gender, phone, address, registerModal) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      email,
      password,
      gender,
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
        //ambil data user
        dispatch(checkUser());
        closeModalLogin();
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.user,
      });
    } catch (err) {
      console.log(err);
      toast.error("Email or Password is Incorrect", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Change Profile Pict
export const changeAvatar =
  (form, isEditable, setIsEditable, setLoadingSkeleton) => async (dispatch) => {
    setIsEditable(true);
    setLoadingSkeleton(true);
    try {
      const formData = new FormData();
      formData.set("photo", form.photo[0], form.photo[0].filename);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const body = formData;

      const response = await API.patch("/user", body, config);
      // Set Loading
      const timer = setTimeout(() => {
        setIsEditable(false);
        setLoadingSkeleton(false);
      }, 1000);

      // Set Notif
      toast.success(response?.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data,
      });

      checkUser();
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    }
  };

export const saveProfile =
  (form, isEditable, setIsEditable, setLoadingSkeleton) => async (dispatch) => {
    setIsEditable(true);
    setLoadingSkeleton(true);
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

        // Set Loading
        const timer = setTimeout(() => {
          setIsEditable(false);
          setLoadingSkeleton(false);
        }, 1000);

        // Set Notif
        toast.success(response?.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: response.data,
        });

        return () => clearTimeout(timer);
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = form;

        const response = await API.patch("/user/specific", body, config);
        toast.success(response?.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });

        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: response.data,
        });
      }
      // Set Loading
      const timer = setTimeout(() => {
        setLoadingSkeleton(false);
        setIsEditable(false);
      }, 1000);

      checkUser();
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    }
  };
