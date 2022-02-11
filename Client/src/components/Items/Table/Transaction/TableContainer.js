// Import Style
import "../../../../pages/Transaction/ListTransaction.css";
import Nodata from "../../../../img/no-data.jpg";

// Import Component
import Gap from "../../../atoms/Gap";
import TableHead from "../../../Items/Table/Transaction/TableHead";
import {TablePagination} from "@mui/material";

const TableContainer = ({handler, getter}) => {
  const {transaction, page, rowsPerPage} = getter;
  const {handleAction, handleChangePage, handleChangeRowsPerPage} = handler;

  return (
    <div className="container-table">
      <h1 className="title-transaction">Book Transactions</h1>
      <Gap height={29} />
      {!transaction.length ? (
        <img src={Nodata} alt="No Data Transaction" />
      ) : (
        <>
          <TableHead
            getter={{transaction, page, rowsPerPage}}
            handler={{handleAction}}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transaction.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default TableContainer;
