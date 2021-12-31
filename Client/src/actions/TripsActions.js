import axios from "axios";

export const GET_TRIPS = "GET_TRIPS";

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
