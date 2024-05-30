import { getHonestRate } from "../domain/getHonestRate";

describe('function getHonestRate', function () {
    it('should count honest rate', () => {

        const endRate = 0.15
        const days = 95
        
        const actualResult = getHonestRate(endRate, days)*100;

        const expectedResult = 0.1481

        expect(actualResult).toBeCloseTo(expectedResult, 2);
    })
    it('should count honest rate', () => {

        const endRate = 0.1383
        const days = 91
        
        const actualResult = getHonestRate(endRate, days)*100;

        const expectedResult = 0.1383

        expect(actualResult).toBeCloseTo(expectedResult, 2);
    })
})