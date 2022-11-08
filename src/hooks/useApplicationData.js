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

  function updateSpots(appointments) {
    const updatedDays = [...state.days];

    updatedDays.forEach(day => {
      day.spots = day.appointments.reduce((spots, id) => {
        if (!appointments[id].interview) {
          spots++;
        }
        return spots;
      }, 0)
    })

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

      const days = updateSpots(appointments);
  
      setState(prev => ({...prev, days, appointments}));
    })
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointments = {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: null
        }
      };

      const days = updateSpots(appointments);

      setState(prev => ({...prev, days, appointments}));
    })
  }


  return { state, setDay, bookInterview, deleteInterview };
};