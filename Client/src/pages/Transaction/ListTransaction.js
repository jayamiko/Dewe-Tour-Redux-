// Import React
import {useState, useEffect} from "react";
import {toast} from "react-toastify";

// Import Components
import TableContainer from "../../components/Items/table_transaction/TableContainer";
import Spinner from "../../components/atoms/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Gap from "../../components/atoms/Gap";

// Import Style
import "./ListTransaction.css";

import * as React from "react";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

// import API
import {API} from "../../config/api";

const ListTransaction = () => {
  const [transaction, setTransaction] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const getAllData = async () => {
    try {
      const response = await API.get("/transactions");
      setTransaction(response.data.data);
    } catch (error) {
      const message = error.response.data.message || "Unknow error";
      toast.error(message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    getAllData();
  }, []);

  const VISIBLE_FIELDS = ["username", "trip", "attachment", "status", "action"];

  const data = {
    dataSet: transaction,
    visibleFields: VISIBLE_FIELDS,
    rowLength: transaction.length,
  };

  const stateToChild = {
    transaction,
    page,
    rowsPerPage,
  };

  return loadingSkeleton ? (
    <Spinner customText={"Loading.."} />
  ) : (
    <>
      <div className="container-transaction">
        <Navbar />
        <div style={{height: 400, width: "100%"}}>
          <DataGrid
            {...transaction}
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              ...transaction.initialState,
              filter: {
                filterModel: {
                  items: [
                    {
                      columnField: "status",
                      operatorValue: "Approve",
                      value: "Waiting Approve",
                    },
                  ],
                },
              },
            }}
          />
        </div>
        {/* <TableContainer handler={handler} getter={stateToChild} /> */}
      </div>
      <Gap height={60} />
      <Footer />
    </>
  );
};

export default ListTransaction;
