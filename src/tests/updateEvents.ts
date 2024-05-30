import { UpdateEvent } from "../types/types";

export const mkbEventTest1: UpdateEvent = {
    bankId: "mkb",
    date: new Date(2023, 8, 26).toString(),
    deposits: [],
}

export  const bgfEventTest: UpdateEvent = {
    bankId: "bgfbank",
    date: new Date(2023, 8, 23).toString(),
    deposits: [],
}

export const mkbEventTest3: UpdateEvent = {
    bankId: "mkb",
    date: new Date(2023, 7, 26).toString(),
    deposits: [],
}

export const giEventTest: UpdateEvent = {
    bankId: "garant-invest",
    date: new Date(2023, 8, 24).toString(),
    deposits: [],
}

export const itbEventTest: UpdateEvent = {
    bankId: "investtorgbank",
    date: new Date(2023, 8, 25).toString(),
    deposits: [],
}

export const mkbEventTest2: UpdateEvent = {
    bankId: "mkb",
    date: new Date(2023, 8, 23).toString(),
    deposits: [],
}