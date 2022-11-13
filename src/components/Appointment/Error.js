import React from "react";

/**
  * React component for body of Appointment item in ERROR mode
  * @property {String} message Error message to display
  * @property {Function} onClose Function to call when user closes error message
  * @return {Component} React component
*/
export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
    <section className="appointment__error-message">
      <h1 className="text--semi-bold">Error</h1>
      <h3 className="text--light">{props.message}</h3>
    </section>
    <img
      className="appointment__error-close"
      src="images/close.png"
      alt="Close"
      onClick={props.onClose}
    />
  </main>
  );
}