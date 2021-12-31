import axios from "axios";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";

export const getTransactions = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_TRANSACTIONS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "GET",
      url: "http://localhost:5000/api/v1/transactions",
      timeout: 120000,
    })
      .then((response) => {
        // Berhasil get API
        console.log("3. Berhasil Get Data", response);
        dispatch({
          type: GET_TRANSACTIONS,
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
          type: GET_TRANSACTIONS,
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
