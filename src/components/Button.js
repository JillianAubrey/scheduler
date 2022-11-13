import React from "react";
import classNames from "classnames";

import "components/Button.scss";

/**
  * React component for a button
  * @property {Boolean} confirm Whether button should be formatted as confirmation button
  * @property {Boolean} danger Whether button should be formatted as dangerous
  * @property {Boolean} disabled Whether button is disabled
  * @property {Function} onClick Function called when button is clicked
  * @children Text to display on button
  * @return {Component} React component
*/
export default function Button(props) {
  const buttonClass = classNames('button', {
    'button--confirm': props.confirm,
    'button--danger': props.danger
  })

   return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
   );
}
