import {
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from "../actions/UsersActions";

const initialState = {
  isLoading: true,
  error: "",
  user: [],
};

export default function userReducer(state = initialState, actions) {
  const {type, payload} = actions;
  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    case UPDATE_PROFILE_FAIL:
    case GET_USER_DETAIL_FAIL:
    case GET_USER_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
