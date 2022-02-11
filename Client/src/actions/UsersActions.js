import {checkUser} from "./auth";
import {API} from "../config/api";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";
export const GET_USER_DETAIL_SUCCESS = "GET_USER_DETAIL_SUCCESS";
export const GET_USER_DETAIL_FAIL = "GET_USER_DETAIL_FAIL";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

//Get Trips
export const getUsers = () => async (dispatch) => {
  try {
    const response = await API.get("/users");

    dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_USER_FAIL,
    });
  }
};

// Get Trip Detail
export const getUserDetail = (id) => async (dispatch) => {
  try {
    let response = await API.get(`/user/${id}`);
    dispatch({
      type: GET_USER_DETAIL_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_DETAIL_FAIL,
    });
  }
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
    console.log(response);
    checkUser();
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
