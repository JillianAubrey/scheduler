export function getAppointmentsForDay(state) {
  for (const day of state.days) {
    if (day.name === state.day) {
      return [...day.appointments].map(id => state.appointments[id]);
    }
  }
  return [];
}