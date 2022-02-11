import "./BoxProfile.scss";
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Gap from "../../../components/atoms/Gap";

// MUI component
import {Box, Typography, Button, Tooltip} from "@mui/material";

const BoxProfile = ({editable, form, preview, setForm, setPreview}) => {
  const [profile, setProfile] = useState([]);
  const currentState = useSelector((state) => state.auth);
  const {name, email, phone, address, photo} = form;

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

  useEffect(() => {
    setForm(form);
    setProfile(form);
  }, []);

  console.log("form", form);
  console.log(name);

  return (
    <Box className="box-profile">
      <ul className="list-sosmed">
        {editable ? (
          <>
            <li>
              <img src={"iconEmail"} alt="your name here" />
              <Typography variant="subtitle1">{name}</Typography>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name.."
              />
            </li>
            <li>
              <img src={"iconEmail"} alt="your email here" />
              <Typography variant="subtitle1">{email}</Typography>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email.."
              />
            </li>
            <li>
              <img src={"iconPhone"} alt="your phone number here" />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone.."
              />
            </li>
            <li>
              <img src={"iconLocation"} alt="your address here" />
              <input
                variant="field"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address.."
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <img src={"iconEmail"} alt="your name here" />
              <Typography variant="subtitle1">{name}</Typography>
            </li>
            <li>
              <img src={"iconEmail"} alt="your email here" />
              <Typography variant="subtitle1">{email}</Typography>
            </li>
            <li>
              <img src={"iconPhone"} alt="your phone number here" />
              <Typography variant="subtitle1">{phone}</Typography>
            </li>
            <li>
              <img src={"iconLocation"} alt="your address here" />
              <Typography variant="subtitle1">{address}</Typography>
            </li>
          </>
        )}
      </ul>
      <div className="profile-pic">
        <div id="preview-thumbnail">
          <img
            src={preview ? preview : photo}
            width={226}
            alt="your face will be here"
          />
        </div>
        <Gap height={14} />
        {editable ? (
          <Button variant="contained" fullWidth className="button-input-file">
            <input
              className="input-file__profile"
              name="photo"
              type="file"
              style={{width: "280px"}}
              id="inputFileProfile"
              onChange={handleChange}
            />
            Choose photo
          </Button>
        ) : (
          <Tooltip
            title="You can't change anything without first clicking the EDIT button"
            followCursor
          >
            <Button fullWidth className="button-input-file">
              Choose Photo
            </Button>
          </Tooltip>
        )}
      </div>
    </Box>
  );
};

export default BoxProfile;
