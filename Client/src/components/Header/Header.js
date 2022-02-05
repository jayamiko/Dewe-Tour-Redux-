// Import React
import React from "react";
import {Carousel} from "react-bootstrap";

// Import Style
import "./Header.css";
import Trip1a from "../../img/tour/Labuan Bajo/01 - wisata labuan bajo.jpg";
import Trip1b from "../../img/tour/Labuan Bajo/pulau padar.jpg";
import Trip2a from "../../img/tour/France/wisata-perancis.jpg";

// import Components
import Navbar from "../Navbar/Navbar";

function Header(props) {
  const {trips, searchData, setSearchData, setIsSearching} = props;
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(number);
  };
  const handleSearch = (e) => {
    setSearchData(e.target.value);
    e.target.value !== "" ? setIsSearching(true) : setIsSearching(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = trips?.filter((item) =>
      item?.title.toLowerCase().includes(searchData.toLowerCase())
    );
    setSearchData(result);
  };

  return (
    <>
      <div className="background-nav">
        <Navbar />
      </div>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={Trip1a}
            alt="First slide"
            width={100}
          />
          <Carousel.Caption>
            <h2>
              <b>{trips[0].title}</b>
              <p className="carousel-price-text">
                Rp. {rupiah(trips[0].price)}
              </p>
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={Trip1b}
            alt="Second slide"
            width={100}
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={Trip2a}
            alt="Third slide"
            width={100}
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="input-group mb-3" onSubmit={handleSubmit}>
        <input
          className="form-control"
          id="basic-addon2"
          aria-label="search"
          onChange={handleSearch}
          value={searchData}
          aria-describedby="basic-addon2"
          type="search"
          placeholder="Search"
        />
        <a className="input-group-text" href="/">
          Search
        </a>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-4">
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div
                  className="service-item text-center pt-5"
                  style={{
                    backgroundColor: "#FFF",
                    borderRadius: "10px",
                    paddingBottom: "20px",
                  }}
                >
                  <div className="p-4">
                    <i className="fa fa-3x fa-graduation-cap text-primary mb-4"></i>
                    <img
                      src="assets/guarantee.png"
                      alt=""
                      style={{marginBottom: "15px"}}
                    />
                    <h5 className="mb-3">Best Price Guarantee</h5>
                    <p>
                      A small river named Duren flows by their place and
                      supplies
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div
                  className="service-item text-center pt-5"
                  style={{
                    backgroundColor: "#FFF",
                    borderRadius: "10px",
                    paddingBottom: "20px",
                  }}
                >
                  <div className="p-4">
                    <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                    <img
                      src="assets/heart.png"
                      alt=""
                      style={{marginBottom: "15px"}}
                    />
                    <h5 className="mb-3">Travellers Love Us</h5>
                    <p>
                      A small river named Duren flows by their place and
                      supplies
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div
                  className="service-item text-center pt-5"
                  style={{
                    backgroundColor: "#FFF",
                    borderRadius: "10px",
                    paddingBottom: "20px",
                  }}
                >
                  <div className="p-4">
                    <i className="fa fa-3x fa-home text-primary mb-4"></i>
                    <img
                      src="assets/agent.png"
                      alt=""
                      style={{marginBottom: "15px"}}
                    />
                    <h5 className="mb-3">Best Travels Agent</h5>
                    <p>
                      A small river named Duren flows by their place and
                      supplies
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <div
                  className="service-item text-center pt-5"
                  style={{
                    backgroundColor: "#FFF",
                    borderRadius: "10px",
                    paddingBottom: "20px",
                  }}
                >
                  <div className="p-4">
                    <i className="fa fa-3x fa-book-open text-primary mb-4"></i>
                    <img
                      src="assets/cs.png"
                      alt=""
                      style={{marginBottom: "15px"}}
                    />
                    <h5 className="mb-3">Dedicated Support</h5>
                    <p>
                      A small river named Duren flows by their place and
                      supplies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
