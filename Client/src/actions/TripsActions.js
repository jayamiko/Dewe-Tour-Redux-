import {API} from "../config/api";

export const GET_TRIPS = "GET_TRIPS";
export const GET_TRIPS_FAIL = "GET_TRIPS_FAIL";
export const GET_TRIP = "GET_TRIP";
export const TRIP_ERROR = "TRIP_ERROR";
export const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS";
export const ADD_TRIP_FAIL = "ADD_TRIP_FAIL";

//Get Trips
export const getTrips = () => async (dispatch) => {
  try {
    const response = await API.get("/trips");

    dispatch({
      type: GET_TRIPS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_TRIPS_FAIL,
    });
  }
};

// Get Trip Detail
export const getTripDetail = (id) => async (dispatch) => {
  try {
    let response = await API.get(`/trip/${id}`);
    dispatch({
      type: GET_TRIP,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: TRIP_ERROR,
    });
  }
};

//Add Music
export const addTrip = (payload, redirect, price) => async (dispatch) => {
  try {
    const {
      title,
      country,
      accomodation,
      transportation,
      eat,
      day,
      night,
      dateTrip,
      quota,
      description,
      image,
    } = payload;

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    formData.append("title", title);
    formData.append("country", country);
    formData.append("accomodation", accomodation);
    formData.append("transportation", transportation);
    formData.append("eat", eat);
    formData.append("day", day);
    formData.append("night", night);
    formData.append("dateTrip", dateTrip);
    formData.append("price", price);
    formData.append("quota", quota);
    formData.set("maxQuota", payload.quota);
    formData.append("description", description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    let response = await API.post(`/trip`, formData, config);
    dispatch({
      type: ADD_TRIP_SUCCESS,
      payload: response.data.data,
    });
    redirect();
  } catch (error) {
    dispatch({
      type: ADD_TRIP_FAIL,
    });
  }
};
