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
        className="flex-shrink-0 py-4 bg-dark text-white-50"
      >
        <div class="container text-center">
          <p style={{color: "#fff"}}>
            Copyright @ 2021 Dewe Tour - Jaya Miko - NIS. All Rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
