// import React
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTransactions} from "../../actions/TransActions";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import PaymentCard from "../../components/Items/card/PaymentCard";
import Footer from "../../components/Footer/Footer";
import ModalPopUp from "../../components/Items/modal/popUp";

// Import Style
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API
import {API} from "../../config/api";

toast.configure();

export default function Payment() {
  const currentState = useSelector((state) => state);
  const stateAuth = currentState.auth.user;

  const {getTransResult, getTransLoading, getTransError} =
    currentState.transactions;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const [isShow, setIsShow] = useState(false);
  const [transaction, setTransaction] = useState(null);

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
    if (!getTransResult.attachment) {
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
      getTransResult.attachment[0],
      getTransResult.attachment[0].name
    );

    const response = await API.put(
      `/transactions/pay/${getTransResult.id}`,
      formData,
      config
    );
    setTransaction(response.data.data);
    setIsShow(true);
  };

  useEffect(() => {
    getLastTransaction();
  }, []);

  return (
    <>
      {getTransResult ? (
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
      ) : getTransLoading ? (
        <></>
      ) : (
        <p>{getTransError ? getTransError : "Empty Data"}</p>
      )}
      <Footer />
    </>
  );
}
