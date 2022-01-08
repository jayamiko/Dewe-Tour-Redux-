import {useState} from "react";
import "./GoogleLogin.scss";
// import GoogleLogin library
import GoogleLogin from "react-google-login";
import {toast} from "react-toastify";
import store from "../../store";
import {API} from "../../config/api";

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
      };

      const responseAuth = await API.post("/auth/google", body, config);

      if (responseAuth?.status === 200) {
        console.log("Response:", responseAuth.data.data.name);
        store.dispatch({
          type: "LOGIN_SUCCESS",
          payload: responseAuth.data.data,
        });

        const fullname = responseAuth.data.data.name;
        toast.success("Login success, welcome ", fullname);
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
        // render={(renderProps) => (
        //   <button
        //     style={{
        //       padding: "10px 100px",
        //       border: "solid black 1px",
        //       boxShadow: "1px",
        //     }}
        //     onClick={renderProps.onClick}
        //     // sx={styleButton}
        //   >
        //     <img
        //       width={30}
        //       src={"iconGoogle"}
        //       style={{marginRight: 10}}
        //       alt="login with google"
        //     />
        //     Sign in with google
        //   </button>
        // )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginBtn;
