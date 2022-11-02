import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={() => setStudent(student)}
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
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button 
            confirm
            onClick={props.onSave}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}