import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {TablePagination} from "@mui/material";
import "./TableIncome.scss";
import Rupiah from "../../Format/formatRupiah";

function TableIncome({datatrip, handler, rowPage, page}) {
  const {handleChangePage, handleChangeRowsPerPage} = handler;
  return (
    <div style={{width: "390px"}}>
      <TableContainer className="table-income" component={Paper}>
        <Table sx={{minWidth: 250}} aria-label="simple table">
          {/* HEAD TABLE */}
          <TableHead className="table-head">
            <TableRow>
              <TableCell>
                <b>Rank</b>
              </TableCell>
              <TableCell>
                <b>Name Trip</b>
              </TableCell>
              <TableCell>
                <b>Total</b>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* ROW TABLE */}
          {datatrip
            .slice(page * rowPage, page * rowPage + rowPage)
            .map((trip, index) => {
              return (
                <TableRow
                  hover
                  key={index}
                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    <span className="table-row-income">{trip.id}</span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <span className="table-row-income">{trip.title}</span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <span className="table-row-income">
                      {" "}
                      Rp. {Rupiah((trip.maxQuota - trip.quota) * trip.price)}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
        </Table>
      </TableContainer>
      {/* PAGINATION TABLE INCOME */}
      <TablePagination
        rowsPerPageOptions={[2, 4, 8]}
        component="div"
        count={datatrip.length}
        rowsPerPage={rowPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {""}
    </div>
  );
}

export default TableIncome;
