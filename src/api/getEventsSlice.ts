import { addEvent } from "../backend/addEvent";
import { computeEventsSlice } from "../backend/computeEventsSlice";
import { Deposit, UpdateEvent } from "../types/types";

export function getEventsSlice(date?: Date): Promise<UpdateEvent[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(computeEventsSlice(date));
    }, 0)
  })
}

export function saveEvent(bankId: string, deposits: Deposit[]) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(addEvent(bankId, deposits))
    }, 1000);
  })
}
