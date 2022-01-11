import {checkUser} from "../config/auth";
import {API} from "../config/api";

export const PUT_USER_EDIT = "PUT_USER_EDIT";

//Change Profile Pict
export const changeProfile = (photo, idUser) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("photo", photo);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await API.put(`/user/${idUser}`, formData, config);
    dispatch(checkUser());
  } catch (err) {
    console.log(err);
  }
};
