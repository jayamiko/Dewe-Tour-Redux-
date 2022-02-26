const initialValue = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  isLogin: false,
  user: {},
  error: {},
};

const authReducer = (state = initialValue, action) => {
  const {type, payload} = action;

  switch (type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
        error: {},
      };
    case "AUTH_SUCCESS":
    case "REGISTER_SUCCESS":
    case "LOGIN":
      localStorage.setItem("token", payload.token);
      return {
        isLoading: false,
        isLogin: true,
        isAuthenticated: true,
        user: payload,
        error: {},
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);

      return {
        isLoading: false,
        isLogin: true,
        isAuthenticated: true,
        user: payload,
        error: {},
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isAuthenticated: true,
        user: payload,
        isLoading: false,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        isLogin: true,
        isAuthenticated: true,
        user: payload,
        isLoading: false,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        user: {},
        error: payload,
        isLoading: false,
      };
    case "UPDATE_PROFILE_FAIL":
    case "UPDATE_USER_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLoading: false,
        isLogin: false,
        isAuthenticated: false,
        user: {},
      };
    case "STOP_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
    // throw new Error("type doesn't match cases");
  }
};

export default authReducer;
