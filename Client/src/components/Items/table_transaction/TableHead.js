import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableBodyComp from "../../Items/table_transaction/TableBody";
import "../../../pages/Transaction/ListTransaction.css";

const TableHeadComp = ({getter, handler}) => {
  return (
    <TableContainer component={Paper} style={{borderRadius: "10px"}}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>
              <b>No</b>
            </TableCell>
            <TableCell>
              <b>Users</b>
            </TableCell>
            <TableCell>
              <b>Trip</b>
            </TableCell>
            <TableCell>
              <b>Attachment</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBodyComp
          UIComponent={{TableBody, TableRow, TableCell}}
          getter={getter}
          handler={handler}
        />
      </Table>
    </TableContainer>
  );
};

export default TableHeadComp;
