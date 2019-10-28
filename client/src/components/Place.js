import React from "react";

const Place = ({ place, children }) => {
  const { name, description } = place;
  return (
    <div
      style={{
        width: "500px",
        height: "150px",
        margin: "auto",
        // flexbox the rest as well
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // styling
        border: "1px solid #333",
        padding: "1rem"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h3>{name}</h3>
        <p
          className="truncate-overflow"
          style={{
            maxWidth: "250px",
            // allow for appending "..." for text overflow
            position: "relative"
          }}
        >
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};

export default Place;
