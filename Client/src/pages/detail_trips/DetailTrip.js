// Import React
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getTripDetail} from "../../actions/TripsActions";
import {getTransactionDetail} from "../../actions/TransActions";
import moment from "moment";
import {Container} from "react-bootstrap";

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
  const {id} = useParams();
  const currentState = useSelector((state) => state.auth);
  const stateAuth = currentState.user;
  const isLoginSession = useSelector((state) => currentState.isAuthenticated);
  // Loading
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [count, setCount] = useState(1);
  const [transaction, setTransaction] = useState({
    counterQty: "",
    total: "",
    status: "Waiting payment",
    attachment: "",
    tripId: "",
    userId: "",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!Number(id)) {
    history.push("/");
  }

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

  const [quotaRemaining, setQuotaRemaining] = useState({
    quota: tripDetail?.quota - transaction?.counterQty,
  });

  const totalPrice = tripDetail?.price * count;
  const totalPriceInString = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const priceInString = tripDetail.price
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // for set data
  useEffect(() => {
    setTransaction({
      ...transaction,
      counterQty: count,
      total: isNaN(totalPrice) ? tripDetail : totalPrice,
      status: "Waiting payment",
      attachment: "",
      tripId: id,
      userId: stateAuth.id,
    });
  }, [count]);

  console.log("tripDetail", id);
  console.log("count", count);
  console.log("transaction", transaction);
  console.log("TOTAL", transaction.total);

  const [dataTransaction, setDataTransaction] = useState([]);

  const getDataTransactionsByUserId = async () => {
    const response = await API.get("/transactions");
    const filteredTransactions = response?.data?.data.filter(
      (item) => item?.user?.id === stateAuth.id
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

  return loadingSkeleton ? (
    <>
      <Spinner customText={"Loading.."} />
    </>
  ) : (
    <div>
      <div className="background-nav">
        <Navbar />
      </div>
      <Container className="container-detail">
        <div>
          {/* TITLE */}
          <h1>
            {tripDetail?.day}D/{tripDetail?.night}N {tripDetail?.title}
          </h1>
          <small>{tripDetail?.country.name}</small>

          {/* IMAGE TOUR */}
          <img
            src={tripDetail?.image[0].url}
            alt="trip-reguler"
            className="image-tour-reguler"
          />
          <div className="image-tour-other">
            <img
              src={tripDetail?.image[1].url}
              alt="other trip 1"
              className="other-trip-item"
            />
            <img
              src={tripDetail?.image[2].url}
              alt="other trip 2"
              className="other-trip-item"
            />
            <img
              src={tripDetail?.image[3].url}
              alt="other trip 3"
              className="other-trip-item"
            />
          </div>

          {/* INFO DESCRIPTION */}
          <h3 className="information-trip">Information Trip</h3>

          <div className="info-trip">
            <div>
              <p className="title-info">Accomodation</p>
              <div className="title-info-item">
                <img src={Hotel} alt="" />
                <p style={{paddingLeft: "10px"}}>{tripDetail?.accomodation}</p>
              </div>
            </div>
            <div>
              <p className="title-info">Transportation</p>
              <div className="title-info-item">
                <img src={Plane} alt="" />
                <p style={{paddingLeft: "10px"}}>
                  {tripDetail?.transportation}
                </p>
              </div>
            </div>
            <div>
              <p className="title-info">Eat</p>
              <div className="title-info-item">
                <img src={Meal} alt="" />
                <p style={{paddingLeft: "10px"}}>{tripDetail?.eat}</p>
              </div>
            </div>
            <div>
              <p className="title-info">Duration</p>
              <div className="title-info-item">
                <img src={Time} alt="" />
                <p style={{paddingLeft: "10px"}}>
                  {tripDetail?.day} Day {tripDetail?.night}Night
                </p>
              </div>
            </div>
            <div>
              <p className="title-info">Date Trip</p>
              <div className="title-info-item">
                <img src={Calender} alt="" />
                <p style={{paddingLeft: "10px"}}>
                  {moment(tripDetail?.dateTrip).format("l")}
                </p>
              </div>
            </div>
          </div>

          <h3 className="title-description">Description</h3>
          <p className="description">{tripDetail?.description}</p>

          <section>
            <div>
              <div className="price-area">
                <span>{`Rp. ${priceInString}`}/Person</span>
                <div className="counter-area">
                  <button
                    onClick={() => (count === 1 ? "" : setCount(count - 1))}
                  >
                    -
                  </button>
                  <div className="d-inline-block text-center">
                    <span className="counter">{transaction?.counterQty}</span>
                  </div>
                  <button
                    onClick={() =>
                      count === tripDetail?.quota ? "" : setCount(count + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <hr />

              <div className="total">
                <div className="title-total">Total :</div>
                <p>{`Rp. ${totalPriceInString}`}</p>
              </div>
              <hr />
              <button
                type="button"
                className="btn-book-now"
                onClick={handleSubmit}
              >
                BOOK NOW
              </button>
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
      </Container>
      <Footer />
    </div>
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
