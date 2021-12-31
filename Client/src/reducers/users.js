import {GET_USERS} from "../actions/UsersActions";

const initialState = {
  getUsersResult: false,
  getUsersLoading: false,
  getUsersError: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        getUsersResult: action.payload.data,
        getUsersLoading: action.payload.loading,
        getUsersError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default usersReducer;
