import {
  PAYMENT_UPDATE_FAIL,
  PAYMENT_UPDATE_SUCCES,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,
} from "../actions/TransActions";

const initialState = {
  loading: true,
  error: "",
  transactions: [],
};

export default function transReducer(state = initialState, actions) {
  const {type, payload} = actions;
  switch (type) {
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: payload,
        loading: false,
      };

    // case PAYMENT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    case PAYMENT_UPDATE_SUCCES:
      return {
        ...state,
        transactions: state.transactions.map((data) =>
          data.id === payload.data.id
            ? {
                ...data,
                status: payload.data.status,
              }
            : data
        ),
        loading: false,
      };
    // case PAYMENT_ERROR:
    case PAYMENT_UPDATE_FAIL:
    case GET_TRANSACTIONS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
