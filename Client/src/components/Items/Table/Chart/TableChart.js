import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function TableChart({data}) {
  return (
    <div>
      <TableContainer component={Paper} style={{borderRadius: "10px"}}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell>
                <b>No</b>
              </TableCell>
              <TableCell>
                <b>Name Trip</b>
              </TableCell>
              <TableCell>
                <b>Country</b>
              </TableCell>
              <TableCell>
                <b>Quota</b>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow
                hover
                key={index}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  <p className="row-no">{index + 1}</p>
                </TableCell>
                <TableCell component="th" scope="row">
                  <p className="row-nametrip">{item.title}</p>
                </TableCell>
                <TableCell component="th" scope="row">
                  <p className="row-country">{item.country}</p>
                </TableCell>
                <TableCell component="th" scope="row">
                  <p className="row-quota">{item.quota}</p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </div>
  );
}
