// Import React
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {checkUser} from "../../actions/auth";
import {saveProfile} from "../../actions/auth";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {HistoryPayment, BoxProfile} from "../../components/Items/card";
import {LoadingAnimation, NotData} from "../../components/atoms";

// Import Style
import "./Profile.scss";

// Import API
import {API} from "../../config";

const ProfilePage = ({auth: {user}, saveProfile}) => {
  const {name, email, gender, phone, address, photo} = user;
  const [trans, setTrans] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [isEditable, setIsEditable] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [preview, setPreview] = useState(photo);
  const [loadingAfterEdit, setLoadingAfterEdit] = useState(false);

  useEffect(() => {
    document.title = `Profile ${name}`;
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
      saveProfile(form, isEditable, setIsEditable, setLoadingAfterEdit),
  };

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
    checkUser();
    setFilterData(trans);
  }, []);

  const handlerFilterData = {
    byUser: trans.filter((item) => item?.user.id === user?.id),
    byStatus: (e) => {
      const status = e.target.id;

      const data = trans.filter(
        (item) => item.user.id === user?.id && item.status === status
      );

      setFilterData(data);
      setIsFilter(true);
    },
  };

  return loadingAfterEdit ? (
    <div>
      <LoadingAnimation text="Profile Updated" />
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
            <section className="container mx-auto">
              <div className="bg-blue-100 flex my-10">
                <button
                  onClick={handlerFilterData.byStatus}
                  id="Waiting Approve"
                  className="bg-gray-50 py-2 px-4 w-full hover:bg-yellow-500 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                >
                  Waiting Approve
                </button>
                <button
                  onClick={handlerFilterData.byStatus}
                  id="Approve"
                  className="bg-gray-50 py-2 px-4 w-full hover:bg-green-500 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={handlerFilterData.byStatus}
                  id="Cancel"
                  className="bg-gray-50 py-2 px-4 w-full hover:bg-red-600 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300"
                >
                  Canceled
                </button>
              </div>

              {handlerFilterData.byUser && !isFilter ? (
                <>
                  {handlerFilterData.byUser.map((item, index) => {
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

              {handlerFilterData.byUser.length === 0 ||
                (filterData.length === 0 && (
                  <div>
                    <NotData name={name} />
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
  saveProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  checkUser,
  saveProfile,
})(ProfilePage);
