import axios from "axios";
import {checkUser} from "./auth";
import {API} from "../config/api";

export const GET_USERS = "GET_USERS";
export const ADD_USERS = "ADD_USERS"; //Register

export const getUsers = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_USERS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "GET",
      url: "http://localhost:5000/api/v1/users",
      timeout: 120000,
    })
      .then((response) => {
        // Berhasil get API
        dispatch({
          type: GET_USERS,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        // Gagal get API
        dispatch({
          type: GET_USERS,
          payload: {
            loading: {
              loading: false,
              data: false,
              errorMessage: error.message,
            },
          },
        });
      });
  };
};

export const addUsers = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: ADD_USERS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "POST",
      url: "http://localhost:5000/api/v1/register",
      timeout: 120000,
    })
      .then((response) => {
        // Berhasil get API
        console.log("Bersil Post Data", response);
        dispatch({
          type: ADD_USERS,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        // Gagal get API
        dispatch({
          type: ADD_USERS,
          payload: {
            loading: {
              loading: false,
              data: false,
              errorMessage: error.message,
            },
          },
        });
      });
  };
};

//Change Profile Pict
export const changeProfile = (photo, idUser) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("photo", photo);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await API.put(`/user/${idUser}`, formData, config);
    dispatch(checkUser());
  } catch (err) {
    console.log(err);
  }
};
