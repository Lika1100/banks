import { computeEventsSlice } from "../backend/computeEventsSlice";
import { UpdateEvent } from "../types/types";
import { bgfEventTest, giEventTest, itbEventTest, mkbEventTest1, mkbEventTest2, mkbEventTest3 } from "./updateEvents";

const readEvents = () => [mkbEventTest1, bgfEventTest, mkbEventTest3, giEventTest, itbEventTest, mkbEventTest2]

jest.mock("../backend/readEvents", () => ({
    readEvents,
}))

describe("computeEventSlice", function () {
    it ("", () => {
        const date = new Date()
        const actualResult = computeEventsSlice(date);
        const expectedResult: UpdateEvent[] = [mkbEventTest1, bgfEventTest, giEventTest, itbEventTest]
        expect(actualResult).toEqual(expectedResult)
    })
})