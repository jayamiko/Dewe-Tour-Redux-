import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
  const currentState = useSelector((state) => state.auth);
  const getAccess = currentState.user.status === "admin" ? true : false;
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          getAccess ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
};

export default PrivateRoute;
