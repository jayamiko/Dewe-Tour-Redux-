// Import React
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector, connect} from "react-redux";
import PropTypes from "prop-types";
import {getTripDetail} from "../../actions/TripsActions";
import {getTransactionDetail} from "../../actions/TransActions";
import moment from "moment";

// Import Components
import {Container} from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {Spinner} from "../../components/atoms/Spinner/Spinner";
import ModalLogin from "../../components/Items/modal/ModalLogin2";
import setData from "../../utils/setData";
import Rupiah from "../../components/Items/Format/formatRupiah";

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
  const {id} = useParams();
  useEffect(() => {
    getTripDetail(id);
  }, [getTripDetail]);
  useEffect(() => {
    getTransactionDetail(id);
  }, [getTransactionDetail]);

  let navigate = useNavigate();
  const currentState = useSelector((state) => state.auth);
  const isLoginSession = useSelector((state) => state.auth.isLogin);
  const stateAuth = currentState.user;

  // Loading
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [count, setCount] = useState(1);
  const [transaction, setTransaction] = useState({
    counterQty: "",
    total: "",
    status: "Waiting Approve",
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
    navigate("/");
  }

  const [show, setShow] = useState({
    login: false,
    register: false,
    confirm: false,
  });

  const totalPrice = tripDetail?.price * transaction?.counterQty;
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
      total: totalPrice === undefined || NaN ? transaction?.total : totalPrice,
      status: "Waiting Approve",
      attachment: "",
      tripId: id,
      userId: stateAuth.id,
    });
  }, [count]);

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

  const handleSubtract = () => {
    if (transaction?.counterQty > 1) {
      const subtract = transaction?.counterQty - 1;
      setTransaction(() => ({
        ...transaction,
        counterQty: subtract,
      }));
    }
  };

  const handleAdd = () => {
    if (transaction?.counterQty < tripDetail?.quota) {
      const add = transaction?.counterQty + 1;
      setTransaction(() => ({
        ...transaction,
        counterQty: add,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoadingSkeleton(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const formData = new FormData();
      formData.set("counterQty", transaction?.counterQty);
      formData.set("total", totalPrice);
      formData.set("status", transaction?.status);
      formData.set("attachment", transaction?.attachment);
      formData.set("tripId", transaction?.tripId);
      formData.set("userId", transaction?.userId);

      const response = await API.post("/transaction", formData, config);
      setData("transaction", transaction);

      response.data.status === "success" &&
        toast.success(`Order successful, now complete your transaction`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });

      if (isLoginSession === false) {
        handleShowLogin();
      }

      const timer = setTimeout(() => {
        setLoadingSkeleton(false);
      }, 1000);

      navigate("/payment");
      return () => clearTimeout(timer);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Unknow error");
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
          <small>{tripDetail?.country}</small>

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
                  <button onClick={handleSubtract}>-</button>
                  <div className="d-inline-block text-center">
                    <span className="counter">{transaction?.counterQty}</span>
                  </div>
                  <button onClick={handleAdd}>+</button>
                </div>
              </div>

              <hr />

              <div className="total">
                <div className="title-total">Total :</div>
                <p>Rp. {Rupiah(totalPrice)}</p>
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
