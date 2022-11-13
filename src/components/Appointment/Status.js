import React from "react";

/**
  * React component for body of Appointment item in SAVING or DELETING mode
  * @property {String} message Status message to display
  * @return {Component} React component
*/
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}