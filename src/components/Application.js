import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { appointmentData } from "appointmentData";

import "components/Application.scss";
import axios from "axios";

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

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
            days={days}
            value={day}
            onChange={setDay}
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
