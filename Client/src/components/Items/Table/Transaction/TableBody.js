import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Button} from "@mui/material";
import "../../../../pages/Transaction/Transaction.scss";

const TableBodyComp = ({UIComponent, getter, handler: {handleAction}}) => {
  const {transaction, page, rowsPerPage} = getter;
  const {TableBody, TableRow, TableCell} = UIComponent;

  return (
    <TableBody>
      {transaction
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item, index) => {
          let statusStyle = "";
          switch (item.status) {
            case "Waiting Approve":
              statusStyle = "#F7941E"; //Orange
              break;

            case "Approve":
              statusStyle = "#0ACF83"; //Green
              break;

            case "Cancel":
              statusStyle = "#FF0742"; //Tomato
              break;

            default:
              break;
          }

          return (
            <TableRow
              hover
              key={index}
              sx={{"&:last-child td, &:last-child th": {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.user.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.trip.title}
              </TableCell>
              <TableCell component="th" scope="row">
                <a href={item.attachment} className="prev-attachment">
                  Preview
                </a>
              </TableCell>
              <TableCell component="th" scope="row" sx={{color: statusStyle}}>
                {item.status}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {item.status === "Approve" ? (
                  <CheckCircleIcon sx={{color: "#0ACF83"}} />
                ) : item.status === "Cancel" ? (
                  <HighlightOffIcon sx={{color: "#FF0742"}} />
                ) : (
                  <>
                    <Button
                      variant="contained"
                      className="btn-cancel"
                      onClick={() => handleAction("Cancel", item.id)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="btn-approve"
                      onClick={() => handleAction("Approve", item.id)}
                    >
                      Approve
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableBodyComp;
