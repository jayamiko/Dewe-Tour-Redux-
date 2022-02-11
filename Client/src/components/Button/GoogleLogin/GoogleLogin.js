// Import React
import GoogleLogin from "react-google-login";

// Import API
import {API} from "../../../config/api";
import store from "../../../store";

// Import Style
import "./GoogleLogin.scss";
import {toast} from "react-toastify";

const GoogleLoginBtn = () => {
  const responseGoogle = async (response) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        token: response.tokenId,
        profileObj: response.profileObj,
      };

      const responseAuth = await API.post("/auth/google", body, config);

      if (responseAuth?.status === 200) {
        store.dispatch({
          type: "LOGIN",
          payload: responseAuth.data.user.data,
        });
        const fullname = responseAuth?.data?.user?.data?.name;
        toast.success("Login success, welcome " + fullname);
      }
    } catch (error) {
      const message = error.message;
      console.log(error);
      toast.error(message);
    }
  };

  return (
    <div className="btn-login-google">
      <GoogleLogin
        clientId="447423479192-0iat8tfql3hlhatsm1i62jhiof1eg8hb.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginBtn;
