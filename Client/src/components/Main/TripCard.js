// Import React
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, connect} from "react-redux";
import PropTypes from "prop-types";
import {getTrips} from "../../actions/TripsActions";
import ReactPaginate from "react-paginate";
import Rupiah from "../../components/Items/Format/formatRupiah";

// Import Syle
import {Container} from "react-bootstrap";
import "./Main.scss";

function TripCard({getTrips, trips: {tripsAll}}) {
  useEffect(() => {
    getTrips();
  }, [getTrips]);

  let navigate = useNavigate();

  const [dataTrip, setDataTrip] = useState(tripsAll.slice(0, 50));
  const [pageNumber, setPageNumber] = useState(0);

  const currentState = useSelector((state) => state);
  const isAdmin = currentState.auth.user.status === "admin";

  const tripPerPage = 2;
  const pagesVisited = pageNumber * tripPerPage;

  const displayTrips = dataTrip
    .slice(pagesVisited, pagesVisited + tripPerPage)
    .map((item, index) => {
      return (
        <div
          key={`groupTour-index${index}`}
          className={`${item.quota > 0 ? "area-card-trip" : "d-none"}`}
        >
          <Link to={`/detail/${item.id}`} className="text-decoration-none">
            <div className="card-trip">
              <img
                src={item.image[0].url}
                alt={item.title}
                className="card-img-top rounded mb-1"
                width="328"
                height="241"
              />
              <div className="capacity rounded-start bg-white text-dark d-flex justify-content-center align-items-center fw-bold">
                {item.quota}/{item.maxQuota}
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3 text-dark fw-bold text-truncate">
                  {item.title}
                </h5>
                <div className="card-text d-flex justify-content-between">
                  {isAdmin ? (
                    <span style={{color: "orange"}}>
                      Rp. {(item.maxQuota - item.quota) * item.price}
                    </span>
                  ) : (
                    <span style={{color: "orange"}}>
                      Rp. {Rupiah(item.price)}
                    </span>
                  )}
                  <span style={{color: "rgb(55, 184, 235)"}}>
                    {item.country}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });

  const pageCount = Math.ceil(dataTrip.length / tripPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="main-admin">
        <button
          className="btn-add-trip"
          onClick={() => {
            navigate("/add-trip");
          }}
        >
          + Add Trip
        </button>
        <div className="content-trip-admin">{displayTrips}</div>
        <div className="paginate-content">
          <ReactPaginate
            previousLabel={"<< Previous"}
            nextLabel={"Next >>"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </>
  );
}

TripCard.propTypes = {
  getTrips: PropTypes.func.isRequired,
  trips: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trips: state.trips,
});

export default connect(mapStateToProps, {getTrips})(TripCard);
