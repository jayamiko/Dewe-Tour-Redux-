import React from "react";
import "./ButtonFilter.scss";

export default function ButtonFilter({props}) {
  return (
    <div className="btn-filters">
      <button
        onClick={props.byStatus}
        id="Waiting Approve"
        className="waiting-approve-filter"
      >
        Waiting Approve
      </button>
      <button onClick={props.byStatus} id="Approve" className="approve-filter">
        Approve
      </button>
      <button onClick={props.byStatus} id="Cancel" className="cancel-filter">
        Canceled
      </button>
    </div>
  );
}
