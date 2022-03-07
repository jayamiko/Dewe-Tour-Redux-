// Import React
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {checkUser} from "../../actions/auth";
import {changeAvatar} from "../../actions/auth";
import {saveProfile} from "../../actions/auth";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HistoryPayment from "../../components/Items/card/HistoryPayment";
import BoxProfile from "../../components/Items/card/BoxProfile";
import LoadingAnimation from "../../components/atoms/Loading/Loading";

// Import Style
import "./Profile.scss";
import Nodata from "../../components/atoms/NotData/NotData";

// Import API
import {API} from "../../config/api";

const ProfilePage = ({auth: {user}, saveProfile}) => {
  const {name, email, gender, phone, address, photo} = user;
  const [trans, setTrans] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [isEditable, setIsEditable] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [preview, setPreview] = useState(photo);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    document.title = "Profile";
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    name,
    email,
    gender,
    phone,
    address,
    photo,
  });

  const handler = {
    handleSaveProfile: () =>
      saveProfile(form, isEditable, setIsEditable, setLoadingSkeleton),
    handleChangeAvatar: () =>
      changeAvatar(form, isEditable, setIsEditable, setLoadingSkeleton),
  };

  useEffect(() => {
    checkUser();
  }, []);

  const getDataTransactions = async () => {
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
    getDataTransactions();
    setFilterData(trans);
  }, []);

  const dataByUser = trans.filter((item) => item?.user.id === user?.id);

  const filterDataByStatus = (e) => {
    const status = e.target.id;

    const data = dataByUser.filter((item) => item.status === status);

    setFilterData(data);
    setIsFilter(true);
  };

  return loadingSkeleton ? (
    <div>
      <LoadingAnimation />
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
          changeAvatar={handler.handleChangeAvatar}
          setLoadingSkeleton={setLoadingSkeleton}
        />

        <div>
          <h1 className="title-history-trip">History Trip</h1>
          <div>
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
                >
                  Waiting Approve
                </button>
                <button
                  onClick={filterDataByStatus}
                  id="Approve"
                  className="bg-gray-50 py-2 px-4 w-full hover:bg-green-500 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={filterDataByStatus}
                  id="Cancel"
                  className="bg-gray-50 py-2 px-4 w-full hover:bg-red-600 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                >
                  Canceled
                </button>
              </div>

              {/* PERTAMA TAMPIL */}
              {dataByUser && !isFilter ? (
                <>
                  {dataByUser.map((item, index) => {
                    return (
                      <div key={index}>
                        <HistoryPayment
                          data={item}
                          key={`paymentCard-${index}`}
                        />
                        {/* <hr></hr> */}
                      </div>
                    );
                  })}
                </>
              ) : (
                filterData &&
                isFilter && (
                  <>
                    {filterData.map((item, index) => {
                      return (
                        <div key={index}>
                          <HistoryPayment
                            data={item}
                            key={`paymentCard-${index}`}
                          />
                          {/* <hr></hr> */}
                        </div>
                      );
                    })}
                  </>
                )
              )}

              {dataByUser.length === 0 ||
                (filterData.length === 0 && (
                  <div>
                    <Nodata name={name} />
                  </div>
                ))}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

ProfilePage.propTypes = {
  checkUser: PropTypes.object.isRequired,
  changeAvatar: PropTypes.func.isRequired,
  saveProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  checkUser,
  saveProfile,
  changeAvatar,
})(ProfilePage);
