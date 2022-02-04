import React from "react";
import {Link} from "react-router-dom";
// import "./BtnBack.scss";
import Homeflat from "../../img/homeflat.png";

function BtnBack() {
  return (
    <div>
      <Link to="/">
        <button className="Btn-back">
          <img src={Homeflat} alt="" width={35} />
          <p>Back</p>
        </button>
      </Link>
    </div>
  );
}

export default BtnBack;
