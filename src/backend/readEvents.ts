import { mockEvents } from "./mockEvents";
import { UpdateEvent } from "../types/types";

export function readEvents(): UpdateEvent[] {
    const json = localStorage.getItem("events");
    if (json === null) {
      return mockEvents;
    }
  
    return JSON.parse(json);
  }