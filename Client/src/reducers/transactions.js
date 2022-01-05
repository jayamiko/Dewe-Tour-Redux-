import {
  PAYMENT_UPDATE_FAIL,
  PAYMENT_UPDATE_SUCCES,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,
  ADD_PAYMENT_TRIP,
  PAYMENT_TRIP_ERROR,
  GET_TRANSACTION_DETAIL,
  TRANSACTION_DETAIL_ERROR,
} from "../actions/TransActions";

const initialState = {
  isLoading: true,
  error: "",
  transactions: [],
  transDetail: [],
};

export default function transReducer(state = initialState, actions) {
  const {type, payload} = actions;
  switch (type) {
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: payload,
        isLoading: false,
      };
    case GET_TRANSACTION_DETAIL:
      return {
        ...state,
        transDetail: payload,
        isLoading: false,
      };
    case ADD_PAYMENT_TRIP:
      return {
        ...state,
        isLoading: false,
      };
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
        isLoading: false,
      };
    // case PAYMENT_ERROR:
    case PAYMENT_UPDATE_FAIL:
    case PAYMENT_TRIP_ERROR:
    case TRANSACTION_DETAIL_ERROR:
    case GET_TRANSACTIONS_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
