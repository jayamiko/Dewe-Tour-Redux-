// Import React
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, connect} from "react-redux";
import PropTypes from "prop-types";
import {getTrips} from "../actions/TripsActions";

// Import Style
import {Container} from "react-bootstrap";
import noResult from "../img/no-result.png";
import Icon from "../img/Icon1.png";
import "../App.css";

// Import Components
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import GroupTour from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Spinner from "../components/atoms/Spinner/Spinner";

function Home({
  getTrips,
  trips: {tripsAll},
  auth: {isAuthenticated, user, isLoading},
}) {
  const [searchData, setSearchData] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const currentState = useSelector((state) => state);
  const isAdmin = currentState.auth.user.status === "admin";

  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  return loadingSkeleton || isLoading ? (
    <div>
      <Spinner customText={"Loading.."} />
    </div>
  ) : (
    <>
      {isAuthenticated && isAdmin ? (
        <>
          <Navbar />
          <GroupTour data={tripsAll} isAdmin={isAdmin} />
        </>
      ) : (
        <>
          <div className="icon-dw">
            <Link to="/">
              <img src={Icon} alt="icon" className="icon-dewetour" />
            </Link>
          </div>
          <Header
            trips={tripsAll}
            setIsSearching={setIsSearching}
            searchData={searchData}
            setSearchData={setSearchData}
          />
          {isSearching ? (
            <GroupTour data={tripsAll} searchData={searchData} />
          ) : (
            <>
              {tripsAll === null ? (
                <div className="d-flex justify-content-center align-items-center fs-4">
                  <img
                    src={noResult}
                    alt="no-result"
                    width="450px"
                    height="450px"
                  />
                </div>
              ) : (
                <Container fluid className="main">
                  <GroupTour data={tripsAll} />
                </Container>
              )}
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

Home.propTypes = {
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trips: state.trips,
  auth: state.auth,
});

export default connect(mapStateToProps, {getTrips})(Home);
