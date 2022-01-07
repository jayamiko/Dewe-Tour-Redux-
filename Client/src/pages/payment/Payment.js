// import React
import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {getTransactions} from "../../actions/TransActions";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import PaymentCard from "../../components/Items/card/PaymentCard";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/atoms/Spinner";
import ModalPopUp from "../../components/Items/modal/popUp";

// Import Style
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API
import {API} from "../../config/api";

toast.configure();

const Payment = ({
  auth: {user},
  getTransactions,
  transactions: {transactions, isLoading},
}) => {
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const [isShow, setIsShow] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const handleClose = () => {
    setIsShow(false);
  };

  const currentState = useSelector((state) => state.auth);
  const UserPayment = currentState.user?.id;
  console.log(currentState.user?.id);

  const getLastTransaction = async () => {
    try {
      const response = await API.get("/transactions");
      const filteredTransactions = response.data.data.filter(
        (item) => item.user.id === UserPayment
      );
      setTransaction(filteredTransactions[filteredTransactions.length - 1]);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async () => {
    if (!transactions.attachment) {
      toast.success(`Update is Success`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set(
      "attachment",
      transactions.attachment[0],
      transactions.attachment[0].name
    );

    const response = await API.put(
      `/transactions/pay/${transactions.id}`,
      formData,
      config
    );
    setTransaction(response.data.data);
    setIsShow(true);
  };

  useEffect(() => {
    getLastTransaction();
  }, []);

  return loadingSkeleton || isLoading ? (
    <>
      <Spinner customText={"Loading.."} />
    </>
  ) : (
    <>
      {transactions ? (
        <>
          <>
            <div
              style={{
                height: "700px",
              }}
            >
              <div className="background-nav">
                <Navbar />
              </div>
              <main>
                {!transaction ? (
                  <div className="container">
                    <div className="not-found d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <img
                          src={"NotFoundIcon"}
                          alt="Not Found"
                          width="250"
                          height="250"
                        />
                        <h1 className="fw-bold h5">No Transaction Yet</h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <PaymentCard data={transaction} setData={setTransaction} />
                    {transaction?.status === "Waiting Payment" && (
                      <div className="container">
                        <div className="d-flex justify-content-end">
                          <button
                            className={`btn btn-primary mt-2 fw-bold text-white ${
                              transaction?.status === "Waiting Approve" &&
                              "d-none"
                            }`}
                            style={{width: 213, height: 50}}
                            onClick={handlePay}
                          >
                            PAY
                          </button>
                        </div>
                      </div>
                    )}
                    <ModalPopUp isShow={isShow} handleClose={handleClose} />
                  </>
                )}
              </main>
            </div>
          </>
        </>
      ) : (
        <p>Empty Data</p>
      )}
      <Footer />
    </>
  );
};

Payment.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  auth: state.auth,
});

export default connect(mapStateToProps, {getTransactions})(Payment);
