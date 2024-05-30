import { Deposit, UpdateEvent } from "../types/types";
import { readEvents } from "./readEvents";
import { writeEvents } from "./writeEvents";

export function addEvent(bankId: string, deposits: Deposit[]): void {
    const events = readEvents();
    const newEvent: UpdateEvent = {
      bankId,
      date: new Date().toString(),
      deposits
    };
  
    writeEvents([...events, newEvent]);
}