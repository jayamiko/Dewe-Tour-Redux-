import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getTrips} from "../../actions/TripsActions";
import {Form} from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Import Components
import "./Chart.scss";
import {
  DoughnutChart,
  BarChart,
  LineChart,
  PieChart,
} from "../../components/Items/chart";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Chart({getTrips, trips: {tripsAll}}) {
  useEffect(() => {
    getTrips();
  }, [getTrips]);

  const typeChart = [
    {
      type: "Bar",
    },
    {
      type: "Doughnut",
    },
    {
      type: "Line",
    },
    {
      type: "Pie",
    },
  ];

  const [input, setInput] = useState("Bar");

  const handleChange = (event) => {
    const updateForm = {...input};
    updateForm[event.target.name] = event.target.value;
    setInput(updateForm);
  };

  return (
    <div>
      <Navbar />
      <div style={{marginTop: "-37px"}}>
        <h1 className="title-chart">STATISTIK QUOTA TRIP</h1>
        <h6 className="subname-typechart">
          <i>Type {input.chart}</i>
        </h6>
        <Form>
          <Form.Group className="select-type-chart">
            <Form.Control as="select" onChange={handleChange} name="chart">
              <option selected>Pilih Type Chart..</option>
              {typeChart.map((item) => (
                <option value={item.id}>{item.type}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="container-chart">
        <div className="box-table">
          <h2>Table Statistik</h2>
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
              {tripsAll.map((item, index) => {
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
                      <p className="row-country">{item.country.name}</p>
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
        <div className="box-chart">
          {input.chart === "Doughnut" ? (
            <DoughnutChart data={tripsAll} />
          ) : (
            <>
              {input.chart === "Line" ? (
                <LineChart data={tripsAll} />
              ) : (
                <>
                  {input.chart === "Pie" ? (
                    <PieChart data={tripsAll} />
                  ) : (
                    <BarChart data={tripsAll} />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

Chart.propTypes = {
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trips: state.trips,
});

export default connect(mapStateToProps, {
  getTrips,
})(Chart);
