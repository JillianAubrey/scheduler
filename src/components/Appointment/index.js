import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

/**
  * React component for Appointment item
  * @property {Object} interview Interview object. null if no interview is associated with appointment 
  * @property {String} time Time of appointment
  * @property {Array} interviewers List of available interviewers
  * @property {Function} bookInterview Function to POST interview to API server
  * @property {Function} deleteInterview Function to DELETE interview from API server
  * @return {Component} React component
*/
export default function Appointment(props) {
  //Various visual modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { interview, time, interviewers, bookInterview, deleteInterview} = props;
  const { mode, transition, back } = useVisualMode(
      interview ? SHOW : EMPTY
    );

  /**
    * Action to take when saving an interview to an appointment appointment.
    * Calls bookInterview and transitions visual mode as required.
    * @param {String} student Name of student for interview
    * @param {Object} interview Interview object
    * @return {none}
  */
  function save(student, interviewer) {
    transition(SAVING);
    const interview = {
      student,
      interviewer
    };

    bookInterview(interview)
    .then(() => transition(SHOW, true))
    .catch(() => transition(ERROR_SAVE, true));
  }

  /**
    * Action to take when deletion of interview is confirmed.
    * Calls deelteInterview and transitions visual mode as required.
    * @param {none}
    * @return {none}
  */
  function confirmDelete() {
    transition(DELETING, true)

    deleteInterview()
    .then(() => transition(EMPTY, true))
    .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {/* Appointment content is conditionally rendered based on mode*/}
      {mode === EMPTY && (
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form 
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === DELETING && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={confirmDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment."
          onClose = {back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment."
          onClose = {back}
        />
      )}
    </article>
  );
}