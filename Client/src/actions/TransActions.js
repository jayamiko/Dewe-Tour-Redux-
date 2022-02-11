import {useState} from "react";
import {API} from "../config/api";
import {useNavigate} from "react-router-dom";
// Import Style
import {toast} from "react-toastify";
toast.configure();

export const GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS_SUCCESS";
export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";
export const PAYMENT_ERROR = "PAYMENT_ERROR";
export const GET_TRANSACTIONS_ERROR = "GET_TRANSACTIONS_ERROR";
export const GET_TRANSACTION_DETAIL = "GET_TRANSACTION_DETAIL";
export const TRANSACTION_DETAIL_ERROR = "TRANSACTION_DETAIL_ERROR";
export const PAYMENT_UPDATE_SUCCESS = "PAYMENT_UPDATE_SUCCESS";
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
    console.log(error);
    dispatch({
      type: TRANSACTION_DETAIL_ERROR,
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
        type: PAYMENT_UPDATE_SUCCESS,
        payload: response.data.data.user,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PAYMENT_UPDATE_FAIL,
      });
    }
  };

// Upload Payment
export const uploadPayment = (attache, transactions) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.set(
      "attachment",
      transactions.attachment[0],
      transactions.attachment[0].name
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await API.put(
      `/transactions/pay/${transactions.id}`,
      formData,
      config
    );
    dispatch({
      type: PAYMENT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PAYMENT_ERROR,
    });
  }
};
