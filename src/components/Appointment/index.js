import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

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

  const { interview, time, interviewers, bookInterview, deleteInterview} = props;
  const { mode, transition, back } = useVisualMode(
      interview ? SHOW : EMPTY
    );

  function onSave(student, interviewer) {
    transition(SAVING);
    const interview = {
      student,
      interviewer
    };

    bookInterview(interview)
    .then(success => {
      if (success) {
        return transition(SHOW, true);
      }
      back();
    });
  }

  function onDelete() {
    transition(DELETING)

    deleteInterview()
    .then(success => {
      if (success) {
        return transition(EMPTY, true);
      }
      back();
    });
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
          onSave={onSave}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form 
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={onSave}
          onCancel={back}
        />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === DELETING && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={onDelete}
          onCancel={back}
        />
      )}
    </article>
  );
}