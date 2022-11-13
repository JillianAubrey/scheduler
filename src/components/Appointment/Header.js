import React from "react";

/**
  * React component for header of Appointment item
  * @property {String} time Time value to display
  * @return {Component} React component
*/
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}