// Import React
import React, {useState, useEffect} from "react";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TableTransaction from "../../components/Items/table/ListTransaction";
import Spinner from "../../components/atoms/Spinner";

// Import Style
import "./ListTransaction.css";

const ListTransaction = () => {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return loadingSkeleton ? (
    <Spinner customText={"Loading.."} />
  ) : (
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
