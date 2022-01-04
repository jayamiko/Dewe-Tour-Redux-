import {useState, useEffect} from "react";
import search from "../../../img/search.png";
import ModalPay from "../modal/ModalPay";
import {connect} from "react-redux";
import {getTransactions, updatePayment} from "../../../actions/TransActions";
import PropTypes from "prop-types";

const ListTransaction = ({
  getTransactions,
  updatePayment,
  transactions: {transactions, loading},
}) => {
  const [dataPay, setDataPay] = useState({
    id: "",
    qty: "",
    total: "",
    status: "",
    attachment: "",
    createdAt: "2020-12-12",
    user: {
      name: "",
      email: "",
      phone: "",
    },
    trip: {
      name: "",
      country: "",
      dateTrip: "2020-12-12",
      accomodation: "",
      day: "",
      night: "",
      transportation: "",
    },
  });

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const [isShow, setIsShow] = useState(false);

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <section className="list-transaction" style={{minHeight: 450}}>
      <div className="container">
        <h1 className="h4 fw-bold mb-4">Incoming Transaction</h1>
        <table className="table bg-white" style={{fontSize: 12}}>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Users</th>
              <th scope="col">Trip</th>
              <th scope="col">Bukti Transfer</th>
              <th scope="col">Status Payment</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item, index) => {
              return (
                <tr key={`list-transaction-${item.id}`}>
                  <td>{index + 1}</td>
                  <td>{item.user.name}</td>
                  <td>{item.trip.title}</td>
                  <td>
                    <a
                      href={item.attachment}
                      style={{
                        color: "blue",
                        fontFamily: "Avenir",
                        fontSize: "auto",
                      }}
                    >
                      Preview
                    </a>
                  </td>
                  <td
                    className={`fw-bold
                      ${
                        (item.status === "Waiting Payment" ||
                          item.status === "Waiting Approve") &&
                        "status-pending"
                      }
                      ${item.status === "Approve" && "status-approve"}
                      ${item.status === "Cancel" && "status-cancel"}`}
                  >
                    {item.status === "Waiting Payment" ||
                    item.status === "Waiting Approve"
                      ? "Pending"
                      : item.status}
                  </td>
                  <td>
                    <img
                      src={search}
                      alt="Search"
                      width="25"
                      height="25"
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        setDataPay({
                          ...item,
                        });
                        setIsShow(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ModalPay
        isShow={isShow}
        setIsShow={setIsShow}
        handleClose={handleClose}
        transactions={transactions}
        updatePayment={updatePayment}
      />
    </section>
  );
};

ListTransaction.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

export default connect(mapStateToProps, {getTransactions, updatePayment})(
  ListTransaction
);
