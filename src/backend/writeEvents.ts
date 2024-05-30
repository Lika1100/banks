import { UpdateEvent } from "../types/types";

export function writeEvents(events: UpdateEvent[]): void {
    const json = JSON.stringify(events);
    localStorage.setItem("events", json);
  }