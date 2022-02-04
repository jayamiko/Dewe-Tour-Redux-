import React from "react";
import {Link} from "react-router-dom";
import "./BtnHome.scss";
import Homeflat from "../../img/homeflat.png";

function BtnHome() {
  return (
    <div>
      <Link to="/">
        <button className="Btn-Home">
          <img src={Homeflat} alt="" width={35} />
          <p>Back To Home</p>
        </button>
      </Link>
    </div>
  );
}

export default BtnHome;
