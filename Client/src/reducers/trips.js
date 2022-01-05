import {
  GET_TRIPS,
  ADD_TRIP_SUCCESS,
  GET_TRIP,
  ADD_TRIP_FAIL,
  GET_TRIPS_FAIL,
  TRIP_ERROR,
} from "../actions/TripsActions";

const initialState = {
  isLoading: true,
  tripsAll: [],
  tripDetail: null,
  error: "",
};

const tripsReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    case GET_TRIPS:
      return {
        ...state,
        tripsAll: payload,
        isLoading: false,
      };
    case GET_TRIP:
      return {
        ...state,
        tripDetail: payload,
        loading: false,
      };
    case ADD_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_TRIPS_FAIL:
    case ADD_TRIP_FAIL:
    case TRIP_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default tripsReducer;
