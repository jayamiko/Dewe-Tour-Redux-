import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TableTransaction from "../../components/Items/table/Table";
import "./ListTransaction.css";

const ListTransaction = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "200px",
        }}
      >
        <TableTransaction />
      </div>
      <Footer />
    </>
  );
};

export default ListTransaction;
