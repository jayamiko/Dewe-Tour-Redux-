import {useState} from "react";
import {API} from "../config/api";
import {useHistory} from "react-router-dom";
// Import Style
import {toast} from "react-toastify";
toast.configure();

export const GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS";
export const GET_TRANSACTIONS_ERROR = "GET_TRANSACTIONS_ERROR";
export const GET_TRANSACTION_DETAIL = "GET_TRANSACTION_DETAIL";
export const TRANSACTION_DETAIL_ERROR = "TRANSACTION_DETAIL_ERROR";
export const PAYMENT_UPDATE_SUCCES = "PAYMENT_UPDATE_SUCCES";
export const PAYMENT_UPDATE_FAIL = "PAYMENT_UPDATE_FAIL";
export const ADD_PAYMENT_TRIP = "ADD_PAYMENT_TRIP";
export const PAYMENT_TRIP_ERROR = "PAYMENT_TRIP_ERROR";

export const getTransactions = () => async (dispatch) => {
  try {
    const response = await API.get("/transactions");

    dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_TRANSACTIONS_ERROR,
    });
  }
};

// Get Transaction Detail
export const getTransactionDetail = (id) => async (dispatch) => {
  try {
    let response = await API.get(`/transaction/${id}`);
    dispatch({
      type: GET_TRANSACTION_DETAIL,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAIL_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const updatePayment =
  (status, data, idTransactions, userId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (status === "Cancel") {
      let sumQuota = data.counterQty + data.trip.quota;
      const returnQuota = JSON.stringify({quota: sumQuota});

      await API.put(`/trip/${data.trip.id}`, returnQuota, config);
    }

    const body = JSON.stringify({
      status,
      userId,
    });

    try {
      const response = await API.put(
        `/transactions/confirm/${idTransactions}`,
        body,
        config
      );
      dispatch({
        type: PAYMENT_UPDATE_SUCCES,
        payload: response.data.data.user,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PAYMENT_UPDATE_FAIL,
      });
    }
  };

// Add Payment Trip
export const addTripPayment =
  (isLoginSession, tripDatailId, dataTransaction, quota, handleShowLogin) =>
  async (dispatch) => {
    const history = useHistory();
    try {
      if (isLoginSession === true) {
        const detailTripData = await API.get(`/trip/${tripDatailId?.id}`);
        const quotaTrip = detailTripData.data.data.quota;
        console.log(isLoginSession);
        let resultQuota = quotaTrip - dataTransaction?.counterQty;

        if (resultQuota < 0) {
          toast.error(`Limited Quota Tour`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        }

        if (dataTransaction?.status === "Waiting Payment") {
          toast.success(`Booking is Success`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
          history.push("/payment");
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const bodyTransaction = JSON.stringify(dataTransaction);
        const response = await API.post(
          "/transaction",
          bodyTransaction,
          config
        );

        const bodyQuota = JSON.stringify(quota);
        await API.put(`/trip/${tripDatailId?.id}`, bodyQuota, config);
        response.data.status === "success" &&
          toast.success(`Order successful, now complete your transaction`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        dispatch({
          type: ADD_PAYMENT_TRIP,
          payload: response.data.data,
        });
        history.push("/payment");
      } else {
        handleShowLogin();
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: PAYMENT_TRIP_ERROR,
      });
    }
  };
