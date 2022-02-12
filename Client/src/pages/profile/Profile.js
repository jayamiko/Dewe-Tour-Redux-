// Import React
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {checkUser} from "../../actions/auth";
import {saveProfile} from "../../actions/auth";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HistoryPayment from "../../components/Items/card/HistoryPayment";
import Box from "../../components/Items/card/Box";
import BoxProfile from "../../components/Items/card/BoxProfile";
import {Spinner} from "../../components/atoms/Spinner/Spinner";

// Import Style
import "./Profile.scss";
import Nodata from "../../img/folder.png";

// Import API
import {API} from "../../config/api";

const ProfilePage = ({auth: {user}, saveProfile}) => {
  const {name, email, phone, address, photo} = user;
  const [trans, setTrans] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [isEditable, setIsEditable] = useState(false);

  const [preview, setPreview] = useState(photo);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    name,
    email,
    phone,
    address,
    photo,
  });

  const handler = {
    handleSaveProfile: () =>
      saveProfile(form, isEditable, setIsEditable, setLoadingSkeleton),
  };

  useEffect(() => {
    checkUser();
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

  const filterDataByStatus = (e) => {
    const status = e.target.id;

    const data = trans.filter(
      (item) => item?.user.id === user?.id && item.status === status
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
        {/* PROFILE CARD */}
        <BoxProfile
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          form={form}
          preview={preview}
          setForm={setForm}
          setPreview={setPreview}
          data={user}
          save={handler.handleSaveProfile}
        />

        <div>
          <h1 className="title-history-trip">History Trip</h1>

          <div>
            {trans === null ? (
              <div>
                <Spinner customText={"Loading.."} />
              </div>
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
  saveProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {checkUser, saveProfile})(ProfilePage);
