import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

/**
  * React component for single item in InterviewerList
  * @property {Boolean} selected Whether item is currently selected
  * @property {String} avatar URL for avatar image
  * @property {String} name Name of interviewer
  * @property {Function} setInterviewer Function to set this item to selected interviewer
  * @return {Component} React component
*/
export default function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}