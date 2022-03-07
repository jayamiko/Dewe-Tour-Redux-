// Import Style
import "./GoogleLogin.scss";

// Button Google via CSS
export default function ButtonGoogleLogin(props) {
  return (
    <div className="area-google-btn">
      <h6 className="fw-bold">SIGN UP WITH GOOGLE</h6>
      <div className="google-btn" onClick={props.eventHandler}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="icon-google"
          />
        </div>
        <p className="btn-text">
          <b>Sign in with google</b>
        </p>
      </div>
    </div>
  );
}

// Button Google via React-Google-Login
// export const GoogleLoginBtn = () => {
//   const responseGoogle = async (response) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const body = {
//         token: response.tokenId,
//         profileObj: response.profileObj,
//       };

//       const responseAuth = await API.post("/auth/google", body, config);

//       if (responseAuth?.status === 200) {
//         store.dispatch({
//           type: "LOGIN",
//           payload: responseAuth.data.user.data,
//         });
//         const fullname = responseAuth?.data?.user?.data?.name;
//         toast.success("Login success, welcome " + fullname);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="btn-login-google">
//       <GoogleLogin
//         clientId="447423479192-0iat8tfql3hlhatsm1i62jhiof1eg8hb.apps.googleusercontent.com"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={"single_host_origin"}
//       />
//     </div>
//   );
// };
