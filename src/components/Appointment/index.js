import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { interview, time, interviewers, bookInterview} = props;
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
    .then(success => {
      if (success) {
        return transition(SHOW);
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
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
    </article>
  );
}