import {useState} from "react";
import axios from "axios";
import {API} from "../config/api";

export const GET_TRIPS = "GET_TRIPS";
export const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS";
export const ADD_TRIP_FAIL = "ADD_TRIP_FAIL";

export const getTrips = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_TRIPS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "GET",
      url: "http://localhost:5000/api/v1/trips",
      timeout: 120000,
    })
      .then((response) => {
        // Berhasil get API
        console.log("3. Berhasil Get Data", response);
        dispatch({
          type: GET_TRIPS,
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
          type: GET_TRIPS,
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

//Add Music
export const addTrip = (payload, redirect) => async (dispatch) => {
  try {
    const {
      title,
      idCountry,
      accomodation,
      transportation,
      eat,
      day,
      night,
      dateTrip,
      price,
      quota,
      description,
      image,
    } = payload;

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    formData.append("title", title);
    formData.append("idCountry", payload.country);
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
