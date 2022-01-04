// Import Components
// import formatWeek from "../../Items/Format/formatWeek";
// import formatNumber from "../../Items/Format/format";
// import formatDate from "../../Items/Format/formatDate";
import {Modal} from "react-bootstrap";

// Import Styles
import "../../../pages/payment/Payment.css";
import Logo from "../../../img/Icon.png";
import Nodata from "../../../img/no-data.jpg";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Invoice = (props) => {
  const {isShow, setIsShow, handleClose, transactions, updatePayment} = props;
  console.log("transaction:", transactions);
  console.log("update:", updatePayment);

  const handleClickImage = () => {
    transactions.attachment && window.open(transactions.attachment, "_blank");
  };
  const handleUpdate = (status, data, idTransactions, userId) => {
    updatePayment(status, data, idTransactions, userId);
    setTimeout(() => {
      toast.success(`Confirm is Success`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      setIsShow(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      {transactions.map((transaction) => {
        return (
          <div
            className="card border border-secondary mb-3"
            style={{
              width: "1035px",
              height: "493px",
              borderRadius: "5px",
              right: "300px",
              top: "50px",
            }}
          >
            <div className="card-body">
              <div className="row mb-3">
                <div className="d-flex justify-content-between">
                  <img
                    src={Logo}
                    alt="Dewe Tour Logo"
                    width="190"
                    height="68"
                  />
                  <div style={{marginTop: "15px"}}>
                    <h1
                      className="h4 fw-bold text-end"
                      style={{
                        marginLeft: "50px",
                        position: "relative",
                        left: "100px",
                      }}
                    >
                      Booking
                    </h1>
                    <p className="text-end">
                      <span className="fw-bold">{transaction.createdAt}</span>,{" "}
                      {transaction.createdAt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4">
                  <div className="fw-bold fs-5">{transaction.trip.name}</div>
                  <div className="text-muted mb-4">
                    {transaction.trip.countryName}
                  </div>
                  <div
                    className={`notif p-1 d-flex justify-content-center align-items-center
                  ${transaction.status === "Waiting Approve" && "notifWarning"}
                  ${
                    (transaction.status === "Waiting Payment" ||
                      transaction.status === "Cancel") &&
                    "notifDanger"
                  }
                  ${transaction.status === "Approve" && "notifSuccess"}
                  `}
                  >
                    {transaction.status}
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex flex-column">
                    <div className="col-auto mb-4">
                      <div className="fs-6 fw-bold mb-1">Date Trip</div>
                      <div className="text-muted" style={{fontSize: 12}}>
                        {transaction.trip.dateTrip}
                      </div>
                    </div>
                    <div className="col">
                      <div className="fs-6 fw-bold mb-1">Duration</div>
                      <div className="text-muted" style={{fontSize: 12}}>
                        {transaction.trip.day} Day {transaction.trip.night}{" "}
                        Night
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex flex-column">
                    <div className="col-auto mb-4">
                      <div className="fs-6 fw-bold mb-1">Accomodation</div>
                      <div className="text-muted" style={{fontSize: 12}}>
                        {transaction.trip.accomodation}
                      </div>
                    </div>
                    <div className="col">
                      <div className="fs-6 fw-bold mb-1">Transportation</div>
                      <div className="text-muted" style={{fontSize: 12}}>
                        {transaction.trip.transportation}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="file-proofpayment d-flex justify-content-end">
                    <div className="d-flex justify-content-center flex-column">
                      <img
                        src={
                          transaction.attachment
                            ? transaction.attachment
                            : Nodata
                        }
                        alt="attachment"
                        width="140"
                        height="140"
                        onClick={handleClickImage}
                        className={`${transaction.attachment && "image-proof"}`}
                        style={{
                          position: "relative",
                          right: "50px",
                        }}
                      />
                      <div
                        className="text-muted"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        upload payment proof
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row px-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th colSpan="3"></th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    <tr>
                      <td>1</td>
                      <td>{transaction.user.name}</td>
                      <td>{transaction.user.email}</td>
                      <td>{transaction.user.phone}</td>
                      <td className="fw-bold">Qty</td>
                      <td className="fw-bold">:</td>
                      <td className="fw-bold">{transaction.counterQty}</td>
                    </tr>
                    <tr className="fw-bold border-white">
                      <td colSpan="4"></td>
                      <td>Total</td>
                      <td>:</td>
                      <td className="text-danger">
                        Rp. {transaction.trip.price * transaction.counterQty}
                      </td>
                    </tr>
                  </tbody>
                  <div
                    style={{
                      position: "relative",
                      left: "675px",
                      float: "right",
                    }}
                  >
                    <button
                      className="btn btn-danger mt-2 fw-bold text-white me-3"
                      style={{width: 100, height: 35}}
                      onClick={() =>
                        handleUpdate(
                          "Cancel",
                          transaction,
                          transaction.id,
                          transaction.user.id
                        )
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success mt-2 fw-bold text-white"
                      style={{width: 100, height: 35}}
                      onClick={() =>
                        handleUpdate(
                          "Approve",
                          transaction,
                          transaction.id,
                          transaction.user.id
                        )
                      }
                    >
                      Approve
                    </button>
                  </div>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </Modal>
  );
};

export default Invoice;
