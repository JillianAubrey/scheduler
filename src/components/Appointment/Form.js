import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

/**
  * React component for body of Appointment item in CREATE or EDIT mode
  * @property {String} student Initial name of student, null for CREATE mode
  * @property {Number} interviewer Initial id of interviewer, null for CREATE mode
  * @property {Function} onSave Function to call when user saves changes
  * @property {Function} onCancel Function to call when user cancels creation/edit
  * @return {Component} React component
*/
export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null)
  const [error, setError] = useState('');

  /**
    * Resets input values to empty state
    * @param {none}
    * @return {none}
  */
  const reset = () => {
    setStudent('');
    setInterviewerId(null);
  }

  /**
    * Action to take when user presses cancel button.
    * Resets form and calls onCancel
    * @param {none}
    * @return {none}
  */
  const cancel = () => {
    reset();
    props.onCancel();
  }

  /**
    * Action to take when user presses save button.
    * Validates inputs and calls onSave is validation passes. If validation doesn't pass, updates error state to display error message.
    * @param {none}
    * @return {none}
  */
  const validate = () => {
    if (!student) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewerId) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewerId)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
         autoComplete="off"
         onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        {error && <section className="appointment__validation">{error}</section>}
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewerId}
          onChange={setInterviewerId}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button 
            danger
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button 
            confirm
            onClick={validate}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}