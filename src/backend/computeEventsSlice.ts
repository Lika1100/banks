import { UpdateEvent } from "../types/types";
import { readEvents } from "./readEvents";

export function computeEventsSlice(date: Date = new Date()): UpdateEvent[] {
    const events = readEvents();
    console.log(events, "eventsSlice")
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