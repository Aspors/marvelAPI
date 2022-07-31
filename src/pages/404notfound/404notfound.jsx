import React from "react";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <div className="container">
        <ErrorMessage />
        <h2 style={{ textAlign: "center" }}>Sorry, that page doesn't exist</h2>
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            color: "#000",
            textDecoration: "none",
          }}>
          Return to home page
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
