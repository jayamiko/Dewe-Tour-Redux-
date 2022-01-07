// Import React
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getTripDetail} from "../../actions/TripsActions";
import {getTransactionDetail} from "../../actions/TransActions";
import moment from "moment";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/atoms/Spinner";
import ModalLogin from "../../components/Items/modal/ModalLogin";
import ModalRegister from "../../components/Items/modal/ModalRegister.js";

// Import Style
import "./DetailTrip.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calender from "../../img/calender.png";
import Plane from "../../img/plane.png";
import Hotel from "../../img/hotel.png";
import Time from "../../img/time.png";
import Meal from "../../img/meal.png";

// Import API
import {API} from "../../config/api";

toast.configure();

const DetailTrip = ({
  trips: {tripDetail},
  transactions: {transDetail},
  getTripDetail,
  getTransactionDetail,
  match,
}) => {
  useEffect(() => {
    getTripDetail(match.params.id);
  }, [getTripDetail]);
  useEffect(() => {
    getTransactionDetail(match.params.id);
  }, [getTransactionDetail]);

  const history = useHistory();
  const currentState = useSelector((state) => state.auth);
  const stateAuth = currentState.user;
  const isLoginSession = useSelector((state) => currentState.isAuthenticated);

  // Loading
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(number);
  };

  const [show, setShow] = useState({
    login: false,
    register: false,
    confirm: false,
  });

  const TransactionDetail = {
    counterQty: 1,
    total: transDetail?.total,
    tripId: transDetail?.id,
    userId: stateAuth.id,
  };

  const [transaction, setTransaction] = useState({
    counterQty: TransactionDetail.counterQty,
    total: TransactionDetail.total,
    tripId: TransactionDetail.tripId,
    userId: TransactionDetail.userId,
  });

  console.log("transaction:", TransactionDetail);
  let totalPrice = transaction?.counterQty * tripDetail?.price;
  const [quotaRemaining, setQuotaRemaining] = useState({
    quota: tripDetail?.quota - transaction?.counterQty,
  });

  const [dataTransaction, setDataTransaction] = useState([]);

  const getDataTransactionsByUserId = async () => {
    const response = await API.get("/transactions");
    const filteredTransactions = response.data.data.filter(
      (item) => item.user.id === stateAuth.id
    );
    setDataTransaction(filteredTransactions[filteredTransactions.length - 1]);
  };

  useEffect(() => {
    getDataTransactionsByUserId();
  }, []);

  const handleClose = () => {
    setShow({login: false, register: false});
  };

  const handleShowLogin = () => {
    setShow((prevState) => ({...prevState, login: true}));
  };

  const handleSwitch = () => {
    if (show.login) {
      setShow({login: false, register: true});
    } else {
      setShow({login: true, register: false});
    }
  };

  const handleAdd = () => {
    if (transaction?.counterQty < tripDetail?.quota) {
      const add = transaction?.counterQty + 1;
      const updateQuota = tripDetail?.quota - add;
      setQuotaRemaining({quota: updateQuota});
      setTransaction(() => ({
        tripId: tripDetail?.id,
        userId: stateAuth.id,
        counterQty: add,
        total: totalPrice + tripDetail?.price,
      }));
    }
  };

  const handleSubtract = () => {
    if (transaction?.counterQty > 0) {
      const subtract = transaction?.counterQty - 1;
      const updateQuota = tripDetail?.quota - subtract;
      setQuotaRemaining({quota: updateQuota});
      setTransaction(() => ({
        tripId: tripDetail?.id,
        userId: stateAuth.id,
        counterQty: subtract,
        total: totalPrice + tripDetail?.price,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoadingSkeleton(true);
    try {
      if (isLoginSession) {
        const detailTripData = await API.get(`/trip/${tripDetail?.id}`);
        const quotaTrip = detailTripData.data.data.quota;

        let resultQuota = quotaTrip - transaction?.counterQty;

        if (resultQuota < 0) {
          toast.success(`Limited Quota Tour`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });

          const pushToHome = setTimeout(() => {
            history.push("/");
          }, 3000);

          return pushToHome;
        }

        if (dataTransaction?.status === "Waiting Payment") {
          toast.success(`Booking is Success`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
          history.push("/payment");
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const bodyTransaction = JSON.stringify(transaction);
        const response = await API.post(
          "/transaction",
          bodyTransaction,
          config
        );

        const bodyQuota = JSON.stringify(quotaRemaining);
        await API.put(`/trip/${tripDetail?.id}`, bodyQuota, config);
        response.data.status === "success" &&
          toast.success(`Order successful, now complete your transaction`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        history.push("/payment");

        // Loading
        const timer = setTimeout(() => {
          setLoadingSkeleton(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        handleShowLogin();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(transaction);

  return loadingSkeleton ? (
    <>
      <Spinner customText={"Loading.."} />
    </>
  ) : (
    <>
      <div className="background-nav">
        <Navbar />
      </div>
      <div className="container-detail">
        {/* TITLE */}
        <div
          style={{
            width: "max-content",
          }}
        >
          <h1>
            {tripDetail?.day}D/{tripDetail?.night}N {tripDetail?.title}
          </h1>
          <small>{tripDetail?.country.name}</small>
        </div>

        {/* IMAGE TOUR */}
        <img
          src={tripDetail?.image[0].url}
          alt="/"
          style={{
            width: "1018px",
            height: "361.16px",
            borderRadius: "5px",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "1018px",
            justifyContent: "space-between",
          }}
        >
          <img
            src={tripDetail?.image[1].url}
            alt="/"
            style={{
              marginRight: "15px",
              width: "329.73px",
              height: "167.64px",
              borderRadius: "5px",
              marginTop: "15px",
            }}
          />
          <img
            src={tripDetail?.image[2].url}
            alt="/"
            style={{
              marginRight: "15px",
              width: "329.73px",
              height: "167.64px",
              borderRadius: "5px",
              marginTop: "15px",
            }}
          />
          <img
            src={tripDetail?.image[3].url}
            alt="/"
            style={{
              width: "329.73px",
              height: "167.64px",
              borderRadius: "5px",
              marginTop: "15px",
            }}
          />
        </div>

        {/* INFO DESCRIPTION */}
        <h3
          style={{
            fontFamily: "Avenir",
            fontWeight: "900",
            fontSize: "18px",
            lineHeight: "25px",
            display: "flex",
            alignItems: "center",
            color: "#000000",
            marginTop: "25px",
          }}
        >
          Information Trip
        </h3>

        <div className="info-trip">
          <div>
            <p className="title-info">Accomodation</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <img src={Hotel} alt="" />
              <p style={{paddingLeft: "10px"}}>{tripDetail?.accomodation}</p>
            </div>
          </div>
          <div>
            <p className="title-info">Transportation</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <img src={Plane} alt="" />
              <p style={{paddingLeft: "10px"}}>{tripDetail?.transportation}</p>
            </div>
          </div>
          <div>
            <p className="title-info">Eat</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <img src={Meal} alt="" />
              <p style={{paddingLeft: "10px"}}>{tripDetail?.eat}</p>
            </div>
          </div>
          <div>
            <p className="title-info">Duration</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <img src={Time} alt="" />
              <p style={{paddingLeft: "10px"}}>
                {tripDetail?.day} Day {tripDetail?.night}Night
              </p>
            </div>
          </div>
          <div>
            <p className="title-info">Date Trip</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <img src={Calender} alt="" />
              <p style={{paddingLeft: "10px"}}>
                {moment(tripDetail?.dateTrip).format("l")}
              </p>
            </div>
          </div>
        </div>

        <h3
          style={{
            fontFamily: "Avenir",
            fontWeight: "900",
            fontSize: "18px",
            lineHeight: "25px",
            display: "flex",
            alignItems: "center",
            color: "#000000",
            marginTop: "25px",
          }}
        >
          Description
        </h3>
        <p className="description">{tripDetail?.description}</p>

        <section className="detail-calculate mb-5">
          <div style={{marginTop: "15px"}}>
            <div className="d-flex justify-content-between fw-bold fs-5">
              <div style={{color: "orange", fontFamily: "Avenir"}}>
                Rp.
                <span style={{marginLeft: "10px"}}>
                  {rupiah(tripDetail?.price)}
                </span>
                /<span style={{color: "black"}}>Person</span>
              </div>
              <div className="quantity">
                <button
                  style={{
                    background: "orange",
                    color: "white",
                    borderRadius: "10px",
                    width: "26.61px",
                    height: "30px",
                  }}
                  onClick={handleSubtract}
                >
                  -
                </button>
                <div className="d-inline-block text-center" style={{width: 75}}>
                  {transaction?.counterQty}
                </div>
                <button
                  style={{
                    background: "orange",
                    color: "white",
                    borderRadius: "10px",
                    width: "26.61px",
                    height: "30px",
                  }}
                  onClick={handleAdd}
                >
                  +
                </button>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <div className="fs-5">Total :</div>
              <div
                style={{
                  color: "orange",
                  lineHeight: "33px",
                  fontSize: "24px",
                  fontWeight: "900",
                  fontFamily: "Avenir",
                }}
              >
                Rp. {rupiah(totalPrice)}
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                style={{
                  background: "orange",
                  width: "213px",
                  height: "50px",
                  borderRadius: "5px",
                  fontFamily: "Avenir",
                  lineHeight: "25px",
                  fontSize: "18px",
                  fontWeight: "900",
                  textAlign: "center",
                  color: "white",
                }}
                onClick={handleSubmit}
              >
                BOOK NOW
              </button>
            </div>
          </div>

          <ModalLogin
            show={show.login}
            handleClose={handleClose}
            handleSwitch={handleSwitch}
          />

          <ModalRegister
            show={show.register}
            handleClose={handleClose}
            handleSwitch={handleSwitch}
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

DetailTrip.propTypes = {
  trips: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trips: state.trips,
  transactions: state.transactions,
});

export default connect(mapStateToProps, {
  getTripDetail,
  getTransactionDetail,
})(DetailTrip);
