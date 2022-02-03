import React from "react";
import "./Footer.css";
import Leaf from "../../img/leaf.png";

function Footer() {
  return (
    <div
      style={{
        marginTop: "50px",
      }}
    >
      <img alt="leaf" src={Leaf} className="img-footer"></img>
      <footer
        id="sticky-footer"
        className="flex-shrink-0 py-4 text-white-50"
        style={{backgroundColor: "orange"}}
      >
        <div class="container text-center">
          <p style={{color: "#fff", fontWeight: "800", fontFamily: "avenir"}}>
            Copyright @ 2022 Dewe Tour - Jaya Miko - NIS. All Rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
