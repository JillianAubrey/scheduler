/**
 * Gets the appointments associated with given day
 * @param {Object} state State object from Application component
 * @param {String} day Name of day to get appointments for
 * @return {Array} Array of appointment obejcts
*/
export function getAppointmentsForDay(state, day) {
  for (const item of state.days) {
    if (item.name === day) {
      return item.appointments.map(id => state.appointments[id]);
    }
  }
  return [];
}

/**
 * Gets the interviewer object for a given interview
 * @param {Object} state State object from Application component
 * @param {Object} interview Interview object to get interviewer for
 * @return {Object} Interview object with interviewer property being the interviewer object
*/
export function getInterviewer(state, interview) {
  if (!interview) {
    return null;
  }
  
  const interviewerId = interview.interviewer;

  if (!interviewerId) {
    return {...interview};
  }

  const interviewer = state.interviewers[interviewerId];

  if (!interviewer) {
    return {...interview};
  }

  return {...interview, interviewer: {...interviewer}};
}

/**
 * Gets the interviewer objects for a given day
 * @param {Object} state State object from Application component
 * @param {String} day Name of day to get interviewers for
 * @return {Array} Array of interviewer obejcts
*/
export function getInterviewersForDay(state, day) {
  for (const item of state.days) {
    if (item.name === day) {
      return item.interviewers.map(id => state.interviewers[id]);
    }
  }
  return [];
}