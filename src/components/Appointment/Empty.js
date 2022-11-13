import React from "react";

/**
  * React component for body of Appointment item in EMPTY mode
  * @property {Function} onAdd Function to call when add button is clicked
  * @return {Component} React component
*/
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}