import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getTrips} from "../../actions/TripsActions";
import {DoughnutChart, BarChart} from "../../components/Items/chart";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Chart({getTrips, trips: {tripsAll}}) {
  useEffect(() => {
    getTrips();
  }, [getTrips]);

  const typeChart = {
    doughnut: "Doughnut",
    bar: "Bar",
  };

  return (
    <div>
      <Navbar />
      <h1 style={{paddingLeft: "40px", fontWeight: "bold"}}>
        STATISTIK QUOTA TRIP
      </h1>
      <h6 style={{paddingLeft: "40px"}}>
        <i>Type {typeChart.bar}</i>
      </h6>
      {/* <DoughnutChart data={tripsAll} /> */}
      <BarChart data={tripsAll} />
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
