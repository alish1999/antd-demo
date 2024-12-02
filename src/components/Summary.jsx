import React from "react";

const Summary = ({ data }) => (
  <div>
    <h3>Summary</h3>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default Summary;
