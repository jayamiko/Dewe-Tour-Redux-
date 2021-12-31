// Import React
import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTrips} from "../actions/TripsActions";

// Import Style
import {Container} from "react-bootstrap";
import noResult from "../img/no-result.png";

// Import Components
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import GroupTour from "../components/Main/Main";
import Footer from "../components/Footer/Footer";

function Home() {
  const [searchData, setSearchData] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const currentState = useSelector((state) => state);
  const isAdmin = currentState.auth.user.status === "admin";
  const stateTrips = currentState.trips;

  const {getTripsResult, getTripsLoading, getTripsError} = stateTrips;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

  return (
    <>
      {getTripsResult ? (
        <>
          {isAdmin ? (
            <>
              <Navbar />
              <GroupTour data={getTripsResult} isAdmin={isAdmin} />
            </>
          ) : (
            <div>
              <Header
                trips={getTripsResult}
                setIsSearching={setIsSearching}
                searchData={searchData}
                setSearchData={setSearchData}
              />
              {isSearching ? (
                <div className="mt-5">
                  <GroupTour data={getTripsResult} searchData={searchData} />
                </div>
              ) : (
                <>
                  {getTripsResult === null ? (
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
                      <GroupTour data={getTripsResult} />
                    </Container>
                  )}
                </>
              )}
              <Footer />
            </div>
          )}
        </>
      ) : getTripsLoading ? (
        <p>Loading ...</p>
      ) : (
        <p>{getTripsError ? getTripsError : "Empty Data"}</p>
      )}
    </>
  );
}

export default Home;
