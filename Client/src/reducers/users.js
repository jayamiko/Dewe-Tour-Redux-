import {GET_USERS, ADD_USERS} from "../actions/UsersActions";

const initialState = {
  getUsersResult: false,
  getUsersLoading: false,
  getUsersError: false,

  addUsersResult: false,
  addUsersLoading: false,
  addUsersError: false,
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
    case ADD_USERS:
      console.log("Masuk Reducer", action);
      return {
        ...state,
        addUsersResult: action.payload.data,
        addUsersLoading: action.payload.loading,
        addUsersError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default usersReducer;
