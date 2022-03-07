// Import Components
import Carousell from "../utils/Carousell";

// Import Style
import "./Header.scss";

function Header(props) {
  const {trips, searchData, setSearchData, setIsSearching} = props;
  const [Paris, LabuanBajo, HagiaSophia] = trips;

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
      <Carousell
        LabuanBajo={LabuanBajo}
        Paris={Paris}
        HagiaSophia={HagiaSophia}
      />

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
                <div className="service-item text-center pt-5">
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
                <div className="service-item text-center pt-5">
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
                <div className="service-item text-center pt-5">
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
                <div className="service-item text-center pt-5">
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
