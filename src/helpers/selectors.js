export function getAppointmentsForDay(state, day) {
  for (const item of state.days) {
    if (item.name === day) {
      return [...item.appointments].map(id => state.appointments[id]);
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

export function getInterviewersForDay(state, day) {
  for (const item of state.days) {
    if (item.name === day) {
      return [...item.interviewers].map(id => state.interviewers[id]);
    }
  }
  return [];
}