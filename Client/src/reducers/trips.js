import {GET_TRIPS} from "../actions/TripsActions";

const initialState = {
  getTripsResult: false,
  getTripsLoading: false,
  getTripsError: false,
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRIPS:
      return {
        ...state,
        getTripsResult: action.payload.data,
        getTripsLoading: action.payload.loading,
        getTripsError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default tripsReducer;
