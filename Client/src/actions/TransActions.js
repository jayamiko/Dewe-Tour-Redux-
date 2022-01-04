import {API} from "../config/api";

export const GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS";
export const GET_TRANSACTIONS_ERROR = "GET_TRANSACTIONS";
export const PAYMENT_UPDATE_SUCCES = "PAYMENT_UPDATE_SUCCES";
export const PAYMENT_UPDATE_FAIL = "PAYMENT_UPDATE_FAIL";

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

export const updatePayment =
  (status, data, idTransactions, userId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(data);

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
      console.log(response.data.data);
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
