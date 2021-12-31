import {GET_TRANSACTIONS} from "../actions/TransActions";

const initialState = {
  getTransResult: false,
  getTransLoading: false,
  getTransError: false,
};

const transReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        getTransResult: action.payload.data,
        getTransLoading: action.payload.loading,
        getTransError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default transReducer;
