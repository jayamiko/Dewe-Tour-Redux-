import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  console.log("2. Masuk Action");
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
        console.log("3. Berhasil Get Data", response);
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
