// Import Components
import {Button} from "@mui/material";

// import Style
import "./BoxProfile.scss";

// Import Icon
import AvatarDefault from "../../../img/ProfileDefault.png";
import Avatar from "../../../img/avatar.png";
import Envelope from "../../../img/envelope.png";
import Call from "../../../img/phone.png";
import Map from "../../../img/map.png";
import EditIcon from "../../../img/symbol-edit.png";

const BoxProfile = ({
  isEditable,
  setIsEditable,
  form,
  preview,
  setForm,
  setPreview,
  data,
  save,
}) => {
  const {name, email, phone, address, photo} = data;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  console.log(photo);
  console.log("preview", preview);

  return (
    <div>
      {isEditable ? (
        <>
          {/* TAMPILAN SAAT EDIT */}
          <div className="card">
            <div className="card-body">
              <form className="form-edit-profile">
                <h2 className="title-edit">Edit Personal Info</h2>
                <div className="form-group row">
                  <label for="inputName" class="col-sm-2 col-form-label">
                    Full Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="name"
                      type="text"
                      class="form-control"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="staticEmail" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="staticPhone" className="col-sm-2 col-form-label">
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="phone"
                      type="number"
                      className="form-control"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    for="staticAddress"
                    className="col-sm-2 col-form-label"
                  >
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="address"
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
              <img
                src={preview ? preview : photo}
                name="photo"
                type="file"
                className="preview-avatar"
                alt="avatar"
                width={226}
              />
            </div>
            <div className="area-btn-edit">
              <Button className="btn-save" onClick={save}>
                Update Profile
              </Button>
              <input
                type="file"
                className="inputFileAvatar"
                id="photo"
                aria-label="file upload"
                name="photo"
                onChange={handleChange}
                hidden
                multiple
              />
              <label
                htmlFor="photo"
                className="change-avatar-edit"
                onClick={() => {
                  document.getElementsByName("photo")[0].click();
                }}
              >
                Change Photo Profile
              </label>
              {/* <div className="btn-input-avatar">
                <input
                  type="file"
                  onChange={handleChange}
                  className="inputFileAvatar"
                  hidden
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
              </div> */}
            </div>
          </div>
        </>
      ) : (
        <div className="card">
          <div className="card-body">
            <form className="form-edit-profile">
              <h2 className="title-edit">
                Personal Info{" "}
                <img
                  src={EditIcon}
                  alt="icon-edit"
                  width={15}
                  style={{cursor: "pointer"}}
                  onClick={() => setIsEditable(!isEditable)}
                />
              </h2>
              <div className="d-flex align-items-center gap-3 mb-4 ">
                <img className="img-1" src={Avatar} alt=""></img>
                <div>
                  <p className="fw-bold">{name}</p>
                  <small className="sub-info">Full Name</small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mb-4 ">
                <img className="img-1" src={Envelope} alt=""></img>
                <div>
                  <p className="fw-bold">{email}</p>
                  <small className="sub-info">Email</small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mb-4 ">
                <img className="img-1" src={Call} alt=""></img>
                <div>
                  <p className="fw-bold">{phone}</p>
                  <small className="sub-info">Phone</small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mb-4 ">
                <img className="img-1" src={Map} alt=""></img>
                <div>
                  <p className="fw-bold">{address}</p>
                  <small className="sub-info">Address</small>
                </div>
              </div>
            </form>
            <img
              src={photo === null || false ? AvatarDefault : photo}
              name="photo"
              type="file"
              className="card-img-top"
              alt="avatar"
              width={100}
            />
          </div>
          <div className="area-btn-edit">
            <div className="btn-input-avatar">
              <input
                type="file"
                onChange={handleChange}
                className="inputFileAvatar"
                hidden
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
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxProfile;
