import { preferencesSlice } from "../redux/preferencesSlice";

describe('preferencesSlice.reducer', function () {
    it('should add hidden bankId', () => {

        const state = {
            "hiddenBanks": ["id1", "id2", "id3"],
            "hiddenDeposits": []
        };

        const bankId = "id4"

        const action = preferencesSlice.actions.hideBank(bankId);

        const actualResult = preferencesSlice.reducer(state, action);

        const expectedResult = ["id1", "id2", "id3", bankId]

        expect(actualResult.hiddenBanks).toEqual(expectedResult);
    })
    it('should add hidden id', () => {

        const state = {
            "hiddenBanks": ["id1", "id2", "id3"],
            "hiddenDeposits": ["id5", "id6"]
        };

        const id = "id4"

        const action = preferencesSlice.actions.hideDeposit(id);

        const actualResult = preferencesSlice.reducer(state, action);

        const expectedResult =  ["id5", "id6", "id4"]

        expect(actualResult.hiddenDeposits).toEqual(expectedResult);
    })
    it('should remove bankId from array', () => {

        const state = {
            "hiddenBanks": ["id1", "id2", "id3"],
            "hiddenDeposits": ["id5", "id6"]
        };

        const bankId = "id3"

        const action = preferencesSlice.actions.comeBackBank(bankId);

        const actualResult = preferencesSlice.reducer(state, action);

        const expectedResult = ["id1", "id2"]

        expect(actualResult.hiddenBanks).toEqual(expectedResult);
    })
    it('should remove id from array', () => {

        const state = {
            "hiddenBanks": ["id1", "id2", "id3"],
            "hiddenDeposits": ["id5", "id6", "id7"]
        };

        const id = "id6"

        const action = preferencesSlice.actions.comeBackDeposit(id);

        const actualResult = preferencesSlice.reducer(state, action);

        const expectedResult = ["id5", "id7"]

        expect(actualResult.hiddenDeposits).toEqual(expectedResult);
    })
})