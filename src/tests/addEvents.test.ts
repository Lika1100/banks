import { addEvent } from "../backend/addEvent";
import { writeEvents } from "../backend/writeEvents";
import { Deposit } from "../types/types";
import { bgfEventTest, giEventTest, itbEventTest, mkbEventTest1, mkbEventTest2, mkbEventTest3 } from "./updateEvents";

const readEvents = () => [mkbEventTest1, bgfEventTest, mkbEventTest3, giEventTest, itbEventTest, mkbEventTest2]

jest.mock("../backend/readEvents", () => ({
    readEvents
}))

jest.mock("../backend/writeEvents", () => ({
  writeEvents: jest.fn()
}))

describe("addEvent", function () {
    it("", () => {
        const bankId = "sber"
        const deposits: Deposit[] = []
        const actualResult = addEvent(bankId, deposits)
        const sber = {
            bankId,
            date: new Date().toString(),
            deposits
        }
        const expectedResult = [mkbEventTest1, bgfEventTest, mkbEventTest3, giEventTest, itbEventTest, mkbEventTest2, sber]

        expect(writeEvents).toBeCalledWith(expectedResult)
    })
})