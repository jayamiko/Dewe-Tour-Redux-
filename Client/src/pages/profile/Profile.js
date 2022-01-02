// Import React
import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/UsersActions";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HistoryPayment from "../../components/Items/card/HistoryPayment";
import InputFileAvatar from "./updateAvatar";
import Box from "../../components/Items/card/Box";

// Import Style
import "./Profile.css";
import {Container} from "react-bootstrap";
import Avatar from "../../img/avatar.png";
import Envelope from "../../img/envelope.png";
import Call from "../../img/phone.png";
import Map from "../../img/map.png";
import Nodata from "../../img/folder.png";

// Import API
import {API} from "../../config/api";

function Profile() {
  const StateData = useSelector((state) => state);
  const stateAuth = StateData.auth.user;
  const {getUsersResult, getUsersLoading, getUsersError} = StateData.users;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [trans, setTrans] = useState([]);
  const [filterData, setFilterData] = useState([]);

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

  const filterDataByStatus = (e) => {
    const status = e.target.id;

    const data = trans.filter(
      (item) => item.user.id === stateAuth.id && item.status === status
    );

    setFilterData(data);
  };

  return (
    <div>
      <div className="background-nav">
        <Navbar />
      </div>
      <div className="profile-container ">
        {getUsersResult ? (
          getUsersResult
            .filter((myProfile) => myProfile.email === stateAuth.email)
            .map((user) => (
              <div>
                <Container className="d-flex px-5 py-4  data-container rounded justify-content-between">
                  <div className="profile-content px-4">
                    <h1 className="mb-4">Personal Info</h1>
                    <div className="d-flex align-items-center gap-3 mb-4 ">
                      <img className="img-1" src={Avatar} alt=""></img>
                      <div>
                        <p className="fw-bold">{user.name}</p>
                        <small>Full Name</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4 ">
                      <img src={Envelope} alt=""></img>
                      <div>
                        <p className="fw-bold">{user.email}</p>
                        <small>Email</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4 ">
                      <img src={Call} alt=""></img>
                      <div>
                        <p className="fw-bold">{user.phone}</p>
                        <small>Mobile Phone</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-4 ">
                      <img src={Map} alt=""></img>
                      <div>
                        <p className="fw-bold">{user.address}</p>
                        <small>Address</small>
                      </div>
                    </div>
                  </div>
                  <InputFileAvatar />
                </Container>

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
            ))
        ) : getUsersLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{getUsersError ? getUsersError : "Empty Data"}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
