import React from "react";
import {Link} from "react-router-dom";
import ArrowBack from "../../img/back.png";

function BtnBack(props) {
  return (
    <div>
      <Link to={props.link}>
        <img src={ArrowBack} alt="" width={60} />
      </Link>
    </div>
  );
}

export default BtnBack;
