import {
  GET_TRIPS,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAIL,
} from "../actions/TripsActions";

const initialState = {
  getTripsResult: false,
  getTripsLoading: false,
  getTripsError: false,

  loading: true,
  musicAll: [],
  artisAll: [],
  error: "",
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
    case ADD_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_TRIP_FAIL:
    default:
      return state;
  }
};

export default tripsReducer;
