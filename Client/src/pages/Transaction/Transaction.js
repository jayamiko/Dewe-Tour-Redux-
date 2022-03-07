// Import React
import {useState, useEffect} from "react";
import {toast} from "react-toastify";

// Import Components
import TableContainer from "../../components/Items/Table/Transaction/TableContainer";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Gap from "../../components/atoms/Gap";

// Import Style
import "./Transaction.scss";

// import API
import {API} from "../../config/api";

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    document.title = "Transactions";
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await API.get("/transactions");
      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handler = {
    handleAction: async (actionName, id) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = {status: actionName};

        const response = await API.put("/transaction/" + id, body, config);
        const message = response.data.data || "Success change data";
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });

        getAllData();
      } catch (error) {
        const {message} = error?.response?.data.data;
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    },
    handleChangePage: (event, newPage) => {
      setPage(newPage);
    },
    handleChangeRowsPerPage: (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
  };

  const stateToChild = {
    transaction,
    page,
    rowsPerPage,
  };

  return (
    <>
      <div className="container-transaction">
        <Navbar />
        <TableContainer handler={handler} getter={stateToChild} />
      </div>
      <Gap height={60} />
      <Footer />
    </>
  );
};

export default Transaction;
