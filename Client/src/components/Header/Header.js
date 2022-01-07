// Import React
import React from "react";
import {Container} from "react-bootstrap";

// Import Style
import "./Header.css";

// import Components
import Navbar from "../Navbar/Navbar";
import Card from "../Items/card/Card";

function Header(props) {
  const {trips, searchData, setSearchData, setIsSearching} = props;

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
    <div className="header-image">
      <Navbar />
      <h1>Explore</h1>
      <h2>your amazing city together</h2>
      <label>Find great places to holliday</label>
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
      </div>
      <div className="cards-container d-flex gap-5 justify-content-start">
        <Card
          image="assets/guarantee.png"
          title="Best Price
                 Guarantee"
          subtitle="A small river named Duren flows by their place and supplies"
        />
        <Card
          image="assets/heart.png"
          title="Travellers Love Us"
          subtitle="A small river named Duren flows by their place and supplies"
        />
        <Card
          image="assets/agent.png"
          title="Best Travels Agent"
          subtitle="A small river named Duren flows by their place and supplies"
        />
        <Card
          image="assets/cs.png"
          title="Dedicated
                 Support"
          subtitle="A small river named Duren flows by their place and supplies"
        />
      </div>
    </div>
  );
}

export default Header;
