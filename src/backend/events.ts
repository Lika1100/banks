import { Deposit, UpdateEvent } from "../types/types";
import { mockEvents } from "./mockEvents";

// repository
export function readEvents(): UpdateEvent[] {
  const json = localStorage.getItem("events");
  if (json === null) {
    return mockEvents;
  }

  return JSON.parse(json);
}

export function writeEvents(events: UpdateEvent[]): void {
  const json = JSON.stringify(events);
  localStorage.setItem("events", json);
}




// service
export function computeEventsSlice(date: Date = new Date()): UpdateEvent[] {
  const events = readEvents();
  const filteredEvents = events.filter((event) => new Date(event.date) <= date)

  const banks = filteredEvents.map((event) => event.bankId)
  const uniqueBanks = Array.from(new Set(banks))

  return uniqueBanks.map((bank) => {
    return filteredEvents
      .filter((event) => event.bankId === bank)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .at(0)!
  });
}

export function addEvent(bankId: string, deposits: Deposit[]): void {
  const events = readEvents();
  const newEvent: UpdateEvent = {
    bankId,
    date: new Date().toString(),
    deposits
  };

  writeEvents([...events, newEvent]);
}
