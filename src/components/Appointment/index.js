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

export default function Appointment(props) {
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

  function confirmDelete() {
    transition(DELETING, true)

    deleteInterview()
    .then(() => transition(EMPTY, true))
    .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={time} />
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