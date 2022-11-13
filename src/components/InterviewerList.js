import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

/**
  * React controlled component with clickable icons for interviewers
  * @property {Array} interviewers List of available interviewers
  * @property {Number} value State variable containing id of selected interviewer
  * @property {Function} onChange Function called when user selects another interviewer, gets passed id of selection
  * @return {Component} React component
*/
export default function InterviewerList(props) {
  const interviewerListItems = props.interviewers.map(interviewer => {

    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}  
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );
}