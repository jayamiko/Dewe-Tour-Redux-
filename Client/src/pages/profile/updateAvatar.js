// Import React
import React, {useState, useEffect} from "react";
import {changeProfile} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// Import Components
import {SpinnerChild} from "../../components/atoms/Spinner/Spinner";

// Import Style
import "./Profile.scss";
import AvatarDefault from "../../img/ProfileDefault.png";

function Avatar({auth: {user}, changeProfile}) {
  const {name, email, phone, address, photo} = user;

  const [loadingSkeleton, setLoadingSkeleton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="area-avatar">
      {loadingSkeleton ? (
        <div className="container-loading-avatar">
          <SpinnerChild customText={"Update.."} />
        </div>
      ) : (
        <div className="preview-image" style={{width: 280, height: 345}}>
          <img
            src={photo === null ? `${AvatarDefault}` : `${photo}`}
            alt="User"
            width="280"
            height="345"
            className="rounded"
          />
        </div>
      )}
      <input
        type="file"
        hidden
        id="photo"
        aria-label="file upload"
        name="photo"
        onChange={(e) => {
          let file = e.target.files[0];
          changeProfile(file, user.id, setLoadingSkeleton);
        }}
        multiple
      />
      <label
        htmlFor="photo"
        className="btn btnChange mt-3 text-white fw-bold"
        onClick={() => {
          document.getElementsByName("photo")[0].click();
        }}
      >
        Change Photo Profile
      </label>
    </div>
  );
}

Avatar.propTypes = {
  changeProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, {changeProfile})(Avatar);
