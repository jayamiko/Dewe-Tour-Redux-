import {API, setAuthToken} from "../config/api";
// import store from "../store";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

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

export const handleLogin =
  (email, password, modalLogin) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({email, password});

    try {
      const response = await API.post("/login", body, config);
      console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.user,
      });

      //ambil data user
      dispatch(checkUser());
      modalLogin(); //close modal login
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Change Profile Pict
export const changeProfile =
  (photo, idUser, setLoadingSkeleton) => async (dispatch) => {
    setLoadingSkeleton(true);
    try {
      const formData = new FormData();

      formData.append("photo", photo);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const response = await API.put(`/user/${idUser}`, formData, config);
      checkUser();
      setLoadingSkeleton(false);
      console.log(setLoadingSkeleton);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data.data.user,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: UPDATE_PROFILE_FAIL,
      });
    }
  };
