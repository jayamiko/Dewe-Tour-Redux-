// import React
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import PaymentCard from "../../components/Items/card/PaymentCard";
import Footer from "../../components/Footer/Footer";
import ModalPopUp from "../../components/Items/modal/popUp";
import {Spinner} from "../../components/atoms/Spinner/Spinner";

// Import Style
import "./Payment.scss";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API
import {API} from "../../config/api";

toast.configure();

export default function Payment() {
  const currentState = useSelector((state) => state.auth);
  const stateAuth = currentState.user;

  const [isShow, setIsShow] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    document.title = "Payment";
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsShow(false);
  };

  const getLastTransaction = async () => {
    try {
      const response = await API.get("/transactions");
      const filteredTransactions = response.data.data.filter(
        (item) => item.user.id === stateAuth.id
      );
      setTransaction(filteredTransactions[filteredTransactions.length - 1]);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set(
      "attachment",
      transaction.attachment[0],
      transaction.attachment[0].name
    );

    const configJSON = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let sumQuota = transaction.trip.quota - transaction.counterQty;
    const returnQuota = JSON.stringify({quota: sumQuota});

    await API.put(`/trip/${transaction.trip.id}`, returnQuota, configJSON);

    const response = await API.put(
      `/transactions/pay/${transaction.id}`,
      formData,
      config
    );

    if (response.status === 200) {
      toast.success(`Update Attachment Success`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
    setTransaction(response.data.data);
    setIsShow(true);
  };

  useEffect(() => {
    getLastTransaction();
  }, []);

  return loadingSkeleton ? (
    <Spinner customText={"Loading.."} />
  ) : (
    <>
      <div style={{height: "120vh"}}>
        <div className="background-nav">
          <Navbar />
        </div>
        <main className="main-payment">
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
              <>
                {transaction?.attachment &&
                  transaction?.status === "Waiting Approve" && (
                    <button className="btn-pay" onClick={handlePay}>
                      PAY
                    </button>
                  )}
              </>
              <ModalPopUp isShow={isShow} handleClose={handleClose} />
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
