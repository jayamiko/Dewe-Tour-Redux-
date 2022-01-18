// Import React
import {useState, useEffect} from "react";

// Import Components
import formatWeek from "../../Items/Format/formatWeek";
import formatNumber from "../../Items/Format/format";
import formatDate from "../../Items/Format/formatDate";
import {Modal} from "react-bootstrap";
import Spinner from "../../../components/atoms/Spinner";

// Import Styles
import "./style/ModalPay.scss";
import "../../../pages/payment/Payment.css";
import Logo from "../../../img/Icon.png";
import Nodata from "../../../img/no-data.jpg";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Invoice = (props) => {
  const {isShow, setIsShow, handleClose, dataPay, updatePayment} = props;

  const [loadingSkeleton, setLoadingSkeleton] = useState(false);

  const handleClickImage = () => {
    dataPay.attachment && window.open(dataPay.attachment, "_blank");
  };
  const handleUpdate = (status, data, idTransactions, userId) => {
    setLoadingSkeleton(true);
    updatePayment(status, data, idTransactions, userId);
    setTimeout(() => {
      toast.success(`Confirm is Success`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      // Loading
      const timer = setTimeout(() => {
        setLoadingSkeleton(false);
      }, 2000);

      setIsShow(false);
      window.location.reload();
      return () => clearTimeout(timer);
    }, 1000);
  };

  return loadingSkeleton === true ? (
    <Spinner customText={"Loading.."} />
  ) : (
    <Modal show={isShow} onHide={handleClose}>
      <div className="card border border-secondary mb-3">
        <div className="card-body">
          <div className="row mb-3">
            <div className="d-flex justify-content-between">
              <img src={Logo} alt="Dewe Tour Logo" width="190" height="68" />
              <div className="head-modal-pay">
                <h1 className="h4 fw-bold text-end">Booking</h1>
                <p className="text-end">{formatDate(dataPay.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">
              <div className="fw-bold fs-5">{dataPay.trip.name}</div>
              <div className="text-muted mb-4">{dataPay.trip.countryName}</div>
              <div
                className={`notif p-1 d-flex justify-content-center align-items-center
                  ${dataPay.status === "Waiting Approve" && "notifWarning"}
                  ${
                    (dataPay.status === "Waiting Payment" ||
                      dataPay.status === "Cancel") &&
                    "notifDanger"
                  }
                  ${dataPay.status === "Approve" && "notifSuccess"}
                  `}
              >
                {dataPay.status}
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex flex-column">
                <div className="col-auto mb-4">
                  <div className="fs-6 fw-bold mb-1">Date Trip</div>
                  <div className="text-muted" style={{fontSize: 12}}>
                    {formatDate(dataPay.trip.dateTrip)}
                  </div>
                </div>
                <div className="col">
                  <div className="fs-6 fw-bold mb-1">Duration</div>
                  <div className="text-muted" style={{fontSize: 12}}>
                    {dataPay.trip.day} Day {dataPay.trip.night} Night
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex flex-column">
                <div className="col-auto mb-4">
                  <div className="fs-6 fw-bold mb-1">Accomodation</div>
                  <div className="text-muted" style={{fontSize: 12}}>
                    {dataPay.trip.accomodation}
                  </div>
                </div>
                <div className="col">
                  <div className="fs-6 fw-bold mb-1">Transportation</div>
                  <div className="text-muted" style={{fontSize: 12}}>
                    {dataPay.trip.transportation}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{
                height: "220px",
                marginTop: "-50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={dataPay.attachment ? dataPay.attachment : Nodata}
                alt="attachment"
                width="140"
                height="140"
                onClick={handleClickImage}
                className={`${dataPay.attachment && "image-proof"}`}
              />
              <p>upload payment proof</p>
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
                  <td>{dataPay.user.name}</td>
                  <td>{dataPay.user.email}</td>
                  <td>{dataPay.user.phone}</td>
                  <td className="fw-bold">Qty</td>
                  <td className="fw-bold">:</td>
                  <td className="fw-bold">{dataPay.counterQty}</td>
                </tr>
                <tr className="fw-bold border-white">
                  <td colSpan="4"></td>
                  <td>Total</td>
                  <td>:</td>
                  <td className="text-danger">
                    Rp. {formatNumber(dataPay.trip.price * dataPay.counterQty)}
                  </td>
                </tr>
              </tbody>
              {dataPay.status === "Waiting Approve" && (
                <div className="approve-cancel">
                  <button
                    className="btn btn-danger mt-2 fw-bold text-white me-3"
                    style={{width: 100, height: 35}}
                    onClick={() =>
                      handleUpdate(
                        "Cancel",
                        dataPay,
                        dataPay.id,
                        dataPay.user.id
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
                        dataPay,
                        dataPay.id,
                        dataPay.user.id
                      )
                    }
                  >
                    Approve
                  </button>
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Invoice;
