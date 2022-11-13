import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to retrieve data from api server
 * @param {none}
 * @return {Object} useApplicationData object
 * @property {Object} state State object having up-to-date data
 * @property {function} setDay Function to change the day value of state
 * @property {function} bookInterview Function to post new or updated interview to api server, and update state accordingly
 * @property {function} deleteInterview Function to delete interview from api server, and update state accordingly
*/
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // GET requests to retrieve initial data from server
  useEffect(() => {
    Promise.all([
      axios.get('/api/days').then(res => res.data),
      axios.get('/api/appointments').then(res => res.data),
      axios.get('/api/interviewers').then(res => res.data),
    ])
    .then(([days, appointments, interviewers]) => {
      setState(prev => ({...prev, days, appointments, interviewers}));
    })
    .catch(error => console.log(error))
  }, []);

  /**
   * Change the day value of the state
   * @param {String} day New value of day to update to
   * @return {none}
  */
  function setDay(day) {
    setState({ ...state, day});
  };

  /**
   * Update spots remaining when changes are made to an appointment
   * @param {Object} changedAppointment Appointment object that has been edited
   * @return {Array} Updated version of days Array, having spotsRemaining appropriately changed
  */
  function updateSpots(changedAppointment) {
    const updatedDays = [...state.days];

    const id = changedAppointment.id;
    const oldAppointment = state.appointments[id]; //The old version of the same appointment in the state
    const change = !(changedAppointment.interview) - !(oldAppointment.interview); //The change to to the number of spots for the appointment's day

    if (change === 0) return updatedDays; //if no change is required, exits early

    updatedDays.forEach((day, index) => { //Finds affected day and implements change to spots remaining
      if (day.appointments.includes(id)) {
        const spots = day.spots + change;
        updatedDays[index] = {...day, spots};
      }
    });

    return updatedDays
  };

  /**
   * POST interview to api server (either new or updated)
   * @param {Number} appointmentId Id of the affected appointment
   * @param {Object} interview Interview object to be associated with appointment
   * @return {Promise} Returned promise will resolve if PUT request was successful,and reject if it wasn't
  */
  function bookInterview(appointmentId, interview) {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${appointmentId}`, appointment)
    .then(() => {
      const appointments = {
        ...state.appointments,
        [appointmentId]: appointment
      };

      const days = updateSpots(appointment);
  
      setState(prev => ({...prev, days, appointments}));
    })
  };

  /**
   * DELETE interview from api server
   * @param {Number} appointmentId Id of the affected appointment to delete interview from
   * @return {Promise} Returned promise will resolve if DELETE request was successful, and reject if it wasn't
  */
  function deleteInterview(appointmentId) {
    return axios.delete(`/api/appointments/${appointmentId}`)
    .then(() => {
      const appointment = {
        ...state.appointments[appointmentId],
        interview: null
      };

      const appointments = {
        ...state.appointments,
        [appointmentId]: appointment
      };

      const days = updateSpots(appointment);

      setState(prev => ({...prev, days, appointments}));
    })
  };


  return { state, setDay, bookInterview, deleteInterview };
};