import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days').then(res => res.data),
      axios.get('/api/appointments').then(res => res.data),
      axios.get('/api/interviewers').then(res => res.data),
    ])
    .then(([days, appointments, interviewers]) => {
      setState(prev => ({...prev, days, appointments, interviewers}))
    })
    .catch(error => console.log(error))
  }, [])
  
  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response => {
      console.log(response)
      if (response.status !== 204) {
        return
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      setState(prev => ({...prev, appointments}));

      return true;
    })
  }

  const appointments = getAppointmentsForDay(state, state.day).map(appt => {
    const interview = getInterview(state, appt.interview);
    return (
      <Appointment
        key={appt.id}
        {...appt}
        interview={interview}
        interviewers={interviewers}
        bookInterview={(interview) => bookInterview(appt.id, interview)}
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
            onChange={day => setState({ ...state, day})}
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
