// Import React
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

// Import Components
import TripCard from "./TripCard";
import Rupiah from "../../components/Items/Format/formatRupiah";
import Progress from "../Items/Progress/ProgressQuota";

// Import Syle
import "./Main.scss";
import {toast} from "react-toastify";
import {Container} from "react-bootstrap";

// Import API
import {API} from "../../config/api";
import TableIncome from "../Items/Table/IncomeTrip/TableIncome";

export default function GroupTour({data, isAdmin, searchData}) {
  const [trip, setTrip] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const getTrips = async () => {
    try {
      const response = await API.get("/trips");
      setTrip(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handler = {
    handleAction: async (actionName, id) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = {status: actionName};

        const response = await API.put("/trip/" + id, body, config);
        const message = response.data.data || "Success change data";
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });

        getTrips();
      } catch (error) {
        const {message} = error?.response?.data.data;
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    },
    handleChangePage: (event, newPage) => {
      setPage(newPage);
    },
    handleChangeRowsPerPage: (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
  };
  useEffect(() => {
    getTrips();
  }, []);

  return (
    <Container>
      <div>
        {isAdmin ? (
          <Container className="container-incometrip">
            <div className="head-incometrip">
              <h2 className="title-incometrip">INCOME TRIP</h2>
              <TableIncome
                datatrip={data}
                handler={handler}
                rowPage={rowsPerPage}
                page={page}
              />
              ;
            </div>
            {/* CONTENT TRIP */}
            <TripCard />
          </Container>
        ) : (
          <>
            <h2 className="title-group-tour" style={{textAlign: "center"}}>
              Group Tour
            </h2>

            {/* CONTENT TRIP */}
            <div className="row gy-5 pb-5" style={{marginTop: "5px"}}>
              {data
                ?.filter((item) => {
                  if (
                    item?.title
                      .toLowerCase()
                      .includes(searchData?.toLowerCase()) ||
                    item?.country
                      .toLowerCase()
                      .includes(searchData?.toLowerCase()) ||
                    String(item?.price)
                      .toLowerCase()
                      .includes(searchData?.toLowerCase())
                  ) {
                    return item;
                  } else if (!searchData) {
                    return item;
                  }
                })
                .map((item, index) => {
                  return (
                    <>
                      <div
                        key={`groupTour-index${index}`}
                        className={`${
                          item.quota > 0
                            ? "col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
                            : "d-none"
                        }`}
                      >
                        <Link
                          to={`/detail/${item.id}`}
                          style={{textDecoration: "none"}}
                        >
                          <div className="card-trip">
                            <img
                              src={item.image[0].url}
                              alt={item.title}
                              className="card-img-trip rounded mb-1"
                            />
                            <div className="capacity rounded-start bg-white text-dark d-flex justify-content-center align-items-center fw-bold">
                              {item.quota}/{item.maxQuota}
                            </div>
                            <Progress
                              value={item.quota}
                              maxQuota={item.maxQuota}
                            />
                            <div className="card-body">
                              <h5 className="card-title mb-3 text-dark fw-bold text-truncate">
                                {item.title}
                              </h5>
                              <div className="card-text d-flex justify-content-between">
                                {isAdmin ? (
                                  <span style={{color: "orange"}}>
                                    Rp.{" "}
                                    {(item.maxQuota - item.quota) * item.price}
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
                    </>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
