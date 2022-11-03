import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { appointmentData } from "appointmentData";

import "components/Application.scss";
import axios from "axios";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDays = (days) => {
    setState(prev => ({...prev, days}))
  }

  useEffect(() => {
    axios.get('/api/days')
    .then(response => {
      setDays(response.data);
    });
  }, [])

  const appointments = Object.values(appointmentData).map(appt => {
    return (
      <Appointment
        key={appt.id}
        {...appt}
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
