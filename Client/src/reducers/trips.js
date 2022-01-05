import {
  GET_TRIPS,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAIL,
  GET_TRIPS_FAIL,
} from "../actions/TripsActions";

const initialState = {
  isLoading: true,
  musicAll: [],
  artisAll: [],
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
    case ADD_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_TRIPS_FAIL:
    case ADD_TRIP_FAIL:
    default:
      return state;
  }
};

export default tripsReducer;
