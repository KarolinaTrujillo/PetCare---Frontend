export type TimeSlot = {
  start: string;
  end: string;
};

export type Appointment = {
  start: string;
  end: string;
};

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  const hh = h.toString().padStart(2, "0");
  const mm = m.toString().padStart(2, "0");

  return `${hh}:${mm}`;
}

export function generateTimeSlots(
  start: string,
  end: string,
  duration: number
): TimeSlot[] {

  const slots: TimeSlot[] = [];

  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  let current = startMinutes;

  while (current + duration <= endMinutes) {

    const slotStart = minutesToTime(current);
    const slotEnd = minutesToTime(current + duration);

    slots.push({
      start: slotStart,
      end: slotEnd,
    });

    current += duration;
  }

  return slots;
}

export function filterAvailableSlots(
  slots: TimeSlot[],
  appointments: Appointment[]
): TimeSlot[] {

  return slots.filter((slot) => {

    return !appointments.some((appointment) => {

      const slotStart = timeToMinutes(slot.start);
      const slotEnd = timeToMinutes(slot.end);

      const appointmentStart = timeToMinutes(appointment.start);
      const appointmentEnd = timeToMinutes(appointment.end);

      const overlap =
        slotStart < appointmentEnd &&
        slotEnd > appointmentStart;

      return overlap;

    });

  });

}