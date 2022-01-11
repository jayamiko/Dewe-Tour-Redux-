// Import React
import React from "react";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {checkUser} from "../../actions/auth";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HistoryPayment from "../../components/Items/card/HistoryPayment";
import InputFileAvatar from "./updateAvatar";
import Box from "../../components/Items/card/Box";
import Gap from "../../components/atoms/Gap";
import Spinner from "../../components/atoms/Spinner";

// Import Style
import "./Profile.css";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Container} from "react-bootstrap";
import Avatar from "../../img/avatar.png";
import Envelope from "../../img/envelope.png";
import Call from "../../img/phone.png";
import Map from "../../img/map.png";
import Nodata from "../../img/folder.png";

// Import API
import {API} from "../../config/api";
import {useParams} from "react-router-dom";

toast.configure();
const ProfilePage = ({auth: {user}}) => {
  const {name, email, phone, address, photo} = user;
  const [trans, setTrans] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [profile, setProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const [variant, setVariant] = useState("disabled");
  const [preview, setPreview] = useState(profile?.photo);

  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "user",
  });

  useEffect(() => {
    getUser();
  }, []);

  const getData = async () => {
    try {
      const response = await API.get("/transactions");

      const datas = response.data.data;
      const mappedData = datas.map((data) => {
        data.trip.dateTrip = new Date(data.trip.dateTrip).toLocaleDateString(
          "en-GB",
          {weekday: "long", year: "numeric", month: "long", day: "numeric"}
        );
        return data;
      });

      setTrans(mappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    setFilterData(trans);
  }, []);

  const getUser = async () => {
    try {
      const response = await API.get(`/user`);
      const data = response.data.data;
      setProfile(response?.data.data);

      setForm({
        ...form,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: data.status,
      });
    } catch (error) {
      toast.error("Unknow error");
    }
  };

  function handleEdit() {
    isEditable ? setIsEditable(false) : setIsEditable(true);
    variant === "contained" ? setVariant("disabled") : setVariant("contained");
  }

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

  const handleSubmit = async () => {
    setLoadingSkeleton(true);
    try {
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("status", form.status);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = form;
      const response = await API.put("/user/specific", body, config);
      toast.success("Update Profile is Successful", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      setProfile(response.data.data);
      setForm(response.data.data);

      // Loading
      const timer = setTimeout(() => {
        setLoadingSkeleton(false);
      }, 2000);

      handleEdit();
      getUser();
      checkUser();
      return () => clearTimeout(timer);
    } catch (error) {
      handleEdit();
      toast.error("Unknow error");
    }
  };

  const filterDataByStatus = (e) => {
    const status = e.target.id;

    const data = trans.filter(
      (item) => item?.user.id === profile?.id && item.status === status
    );

    setFilterData(data);
  };

  return loadingSkeleton ? (
    <div>
      <Spinner customText={"Loading.."} />
    </div>
  ) : (
    <div>
      <div className="background-nav">
        <Navbar />
      </div>
      <div className="profile-container ">
        <Button variant="contained" className="btn-edit" onClick={handleEdit}>
          Edit
        </Button>
        <div>
          {isEditable ? (
            <>
              <Container className="d-flex px-5 py-4  data-container rounded justify-content-between">
                <Gap height={53} />
                <div>
                  <h1 className="mb-4">Personal Info</h1>
                  <div className="d-flex align-items-center gap-3 mb-4 ">
                    <img className="img-1" src={Avatar} alt=""></img>
                    <div className="column-edit">
                      <input
                        variant="basic"
                        name="name"
                        className="input-edit"
                        value={form?.name}
                        onChange={handleChange}
                      />
                      <Gap height={4} />
                      <small>Full Name</small>
                    </div>
                  </div>
                  <Gap height={28} />
                  <div className="d-flex align-items-center gap-3 mb-4 ">
                    <img src={Envelope} alt=""></img>
                    <div className="column-edit">
                      <input
                        variant="basic"
                        name="email"
                        className="input-edit"
                        value={form?.email}
                        onChange={handleChange}
                      />
                      <Gap height={4} />
                      <small>Email</small>
                    </div>
                  </div>
                  <Gap height={28} />
                  <div className="d-flex align-items-center gap-3 mb-4 ">
                    <img src={Call} alt=""></img>
                    <div className="column-edit">
                      <input
                        variant="basic"
                        name="phone"
                        className="input-edit"
                        value={form?.phone}
                        onChange={handleChange}
                      />
                      <Gap height={4} />
                      <small>Mobile Phone</small>
                    </div>
                  </div>
                  <Gap height={28} />
                  <div className="d-flex align-items-center gap-3 mb-4 ">
                    <img src={Map} alt=""></img>
                    <div className="column-edit">
                      <input
                        variant="basic"
                        name="address"
                        className="input-edit"
                        value={form?.address}
                        onChange={handleChange}
                      />
                      <Gap height={4} />
                      <small>Address</small>
                    </div>
                  </div>
                  <Button variant={variant} onClick={handleSubmit}>
                    Update
                  </Button>
                </div>
              </Container>
            </>
          ) : (
            <Container className="d-flex px-5 py-4  data-container rounded justify-content-between">
              <div className="profile-content px-4">
                <h1 className="mb-4">Personal Info</h1>
                <div className="d-flex align-items-center gap-3 mb-4 ">
                  <img className="img-1" src={Avatar} alt=""></img>
                  <div>
                    <p className="fw-bold">{name}</p>
                    <small>Full Name</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-4 ">
                  <img src={Envelope} alt=""></img>
                  <div>
                    <p className="fw-bold">{email}</p>
                    <small>Email</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-4 ">
                  <img src={Call} alt=""></img>
                  <div>
                    <p className="fw-bold">{phone}</p>
                    <small>Mobile Phone</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-4 ">
                  <img src={Map} alt=""></img>
                  <div>
                    <p className="fw-bold">{address}</p>
                    <small>Address</small>
                  </div>
                </div>
              </div>
              <InputFileAvatar />
            </Container>
          )}
          <h1
            style={{
              fontFamily: "Avenir",
              fontWeight: "900",
              fontSize: "36px",
              lineHeight: "49px",
              display: "flex",
              alignItems: "center",
              marginLeft: "120px",
              marginTop: "120px",
            }}
          >
            History Trip
          </h1>

          <div>
            {trans === null ? (
              <div>Loading...</div>
            ) : (
              <section className="container mx-auto">
                <div
                  className="bg-blue-100 flex my-10"
                  style={{
                    marginBottom: "25px",
                    marginTop: "25px",
                    marginLeft: "10px",
                  }}
                >
                  <button
                    onClick={filterDataByStatus}
                    id="Waiting Approve"
                    className="bg-gray-50 py-2 px-4 w-full hover:bg-yellow-500 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                    style={{
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontWeight: "900",
                      fontFamily: "Avenir",
                      background: "orange",
                    }}
                  >
                    Waiting Approve
                  </button>
                  <button
                    onClick={filterDataByStatus}
                    id="Approve"
                    className="bg-gray-50 py-2 px-4 w-full hover:bg-green-500 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                    style={{
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontWeight: "900",
                      fontFamily: "Avenir",
                      background: "green",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={filterDataByStatus}
                    id="Cancel"
                    className="bg-gray-50 py-2 px-4 w-full hover:bg-red-600 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                    style={{
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontWeight: "900",
                      fontFamily: "Avenir",
                      background: "red",
                    }}
                  >
                    Canceled
                  </button>
                </div>

                <>
                  {filterData.length > 0 ? (
                    <>
                      {filterData.map((item, index) => {
                        return (
                          <Box key={index}>
                            <HistoryPayment
                              data={item}
                              key={`paymentCard-${index}`}
                            />
                          </Box>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <img
                        src={Nodata}
                        alt=""
                        width="450px"
                        height="450px"
                        style={{marginLeft: "450px"}}
                      />
                      <h1
                        style={{
                          textAlign: "center",
                          position: "relative",
                          bottom: "55px",
                          fontWeight: "900",
                          fontFamily: "Avenir",
                        }}
                      >
                        No Data Payment
                      </h1>
                    </>
                  )}
                </>
              </section>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

ProfilePage.propTypes = {
  checkUser: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {checkUser})(ProfilePage);
