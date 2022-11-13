import React from "react";
import useApplicationData from "hooks/useApplicationData";

import DayList from "./DayList";
import Appointment from "./Appointment";

import {getAppointmentsForDay, getInterviewer, getInterviewersForDay} from "../helpers/selectors";

import "components/Application.scss";

/**
  * Main react component for the app
  * @return {Component} React component
*/
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(appt => {
    const interview = getInterviewer(state, appt.interview);
    const { id } = appt;
    return (
      <Appointment
        key={id}
        {...appt}
        interview={interview}
        interviewers={interviewers}
        bookInterview={interview => bookInterview(id, interview)}
        deleteInterview={() => deleteInterview(id)}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
