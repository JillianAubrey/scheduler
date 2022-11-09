import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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

  function setDay(day) {
    setState({ ...state, day})
  };

  function updateSpots(newAppointment) {
    const updatedDays = [...state.days];

    const id = newAppointment.id;
    const oldAppointment = state.appointments[id];
    const change = !(newAppointment.interview) - !(oldAppointment.interview);

    if (change === 0) return updatedDays;

    updatedDays.forEach((day, index) => {
      if (day.appointments.includes(id)) {
        const spots = day.spots + change;
        updatedDays[index] = {...day, spots};
      }
    });

    return updatedDays
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = updateSpots(appointment);
  
      setState(prev => ({...prev, days, appointments}));
    })
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = updateSpots(appointment);

      setState(prev => ({...prev, days, appointments}));
    })
  }


  return { state, setDay, bookInterview, deleteInterview };
};