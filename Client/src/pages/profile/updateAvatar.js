// Import React
import {changeProfile} from "../../actions/UsersActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// Import Style
import "./Profile.css";
import AvatarDefault from "../../img/ProfileDefault.png";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Avatar({auth: {user}, changeProfile}) {
  const {name, email, phone, address, photo} = user;
  return (
    <div className="input-file-avatar">
      <div className="preview-image" style={{width: 280, height: 345}}>
        <img
          src={photo}
          alt="User"
          width="280"
          height="345"
          className="rounded"
        />
      </div>
      <input
        type="file"
        hidden
        id="photo"
        aria-label="file upload"
        name="photo"
        onChange={(e) => {
          let file = e.target.files[0];
          changeProfile(file, user.id);
        }}
        multiple
      />
      <label
        htmlFor="photo"
        className="btn btnChange mt-3 text-white fw-bold"
        onClick={() => {
          document.getElementsByName("photo")[0].click();
        }}
        style={{width: 280}}
      >
        Change Photo Profile
      </label>
    </div>
  );
}

Avatar.propTypes = {
  changeProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, {changeProfile})(Avatar);
