// Import React
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

// Import Libraries
import {Link, useNavigate} from "react-router-dom";
import {useSelector, connect} from "react-redux";

// Import Components
import {getTrips} from "../../../actions/TripsActions";
import ReactPaginate from "react-paginate";
import {formatRupiah} from "../../Items/Format";
import Progress from "../../Items/Progress/ProgressQuota";

// Import Syle
import "../TripCard.scss";
import "./TripAdmin.scss";

function TripCard({getTrips, trips: {tripsAll}}) {
  useEffect(() => {
    getTrips();
  }, [getTrips]);

  let navigate = useNavigate();

  const dataTrip = tripsAll.slice(0, 50);
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
            <div className="card-trip-admin">
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
              <Progress value={item.quota} maxQuota={item.maxQuota} />
              <div className="label-card-admin">
                <h5 className="label-card-title-admin">{item.title}</h5>
                <div className="label-country-price-admin">
                  <span className="label-country-admin">{item.country}</span>
                  {isAdmin ? (
                    <span className="label-price-admin">
                      Rp. {(item.maxQuota - item.quota) * item.price}
                    </span>
                  ) : (
                    <span className="label-price-admin">
                      Rp. {formatRupiah(item.price)}
                    </span>
                  )}
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
        <div className="area-btn-add-trip">
          <button
            className="btn-add-trip"
            onClick={() => {
              navigate("/add-trip");
            }}
          >
            + Add Trip
          </button>
        </div>
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
