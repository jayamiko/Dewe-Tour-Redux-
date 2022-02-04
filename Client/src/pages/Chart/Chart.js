import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getTrips} from "../../actions/TripsActions";
import {Form} from "react-bootstrap";

// Import Components
import {
  DoughnutChart,
  BarChart,
  LineChart,
  PieChart,
} from "../../components/Items/chart";
import TableChart from "../../components/Items/table_transaction/TableChart";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/atoms/Spinner/Spinner";
import BtnHome from "../../components/Button/BtnHome";

// Import Style
import "./Chart.scss";

function Chart({getTrips, trips: {tripsAll}}) {
  useEffect(() => {
    getTrips();
  }, [getTrips]);

  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  return loadingSkeleton ? (
    <div>
      <Spinner customText={"Loading.."} />
    </div>
  ) : (
    <div>
      <Navbar />
      <div className="header-chart">
        <div className="head-title">
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
        <BtnHome />
      </div>
      <div className="container-chart">
        <div className="box-table">
          <h2>Table Statistik</h2>
          <TableChart data={tripsAll} />
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
