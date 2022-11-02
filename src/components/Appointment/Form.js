import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null)
  
  const reset = () => {
    setStudent(props.student || '');
    setInterviewerId(props.interviewer || null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
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
          />
        </form>
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
            onClick={() => props.onSave(student, interviewerId)}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}