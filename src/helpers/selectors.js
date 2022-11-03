export function getAppointmentsForDay(state, day) {
  for (const item of state.days) {
    if (item.name === day) {
      return [...item.appointments].map(id => state.appointments[id]);
    }
  }
  return [];
}