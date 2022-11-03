export function getAppointmentsForDay(state, day) {
  const compareDay = (day || state.day);

  for (const day of state.days) {
    if (day.name === compareDay) {
      return [...day.appointments].map(id => state.appointments[id]);
    }
  }
  return [];
}

export function getInterview(state, interview) {
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