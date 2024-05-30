import { emptyDeposit } from './../redux/depositsSlice';
import { DepositsState, depositsSlice } from "../redux/depositsSlice";
import { Deposit, UpdateEvent } from "../types/types";

jest.mock('../domain/generateId', () => ({
  generateId: () => "XXX",
}));


const deposit1: Deposit = {
    bankId: "mkb",
    id: "1",
    rate: 12,
    term: 91,
    min: 0,
    max: 0,
    finuslugi: true,
    name: '',
    interest: "end",
    replenishment: 0,
    retiree: false,
    isNew: true,
    withdrawal: false,
}

const deposit2: Deposit = {
    bankId: "bgfbank",
    id: "2",
    rate: 14,
    term: 91,
    min: 0,
    max: 0,
    finuslugi: true,
    name: '',
    interest: "end",
    replenishment: 0,
    retiree: false,
    isNew: true,
    withdrawal: false,
}

const deposit3: Deposit = {
    bankId: "bgfbank",
    id: "3",
    rate: 14,
    term: 91,
    min: 0,
    max: 0,
    finuslugi: true,
    name: '',
    interest: "end",
    replenishment: 0,
    retiree: true,
    isNew: true,
    withdrawal: false,
}



describe('depositsSlice.reducer', function () {
    it('should delete value by id', () => {

        const { id, bankId } = {
            id: "1",
            bankId: "mkb"
        };

        const state: DepositsState = {
            "mkb": {
                current: [],
                draft: [ deposit1, deposit2, deposit3]
            }
        };
        const action = depositsSlice.actions.handleRemove({ id, bankId });

        const actualResult = depositsSlice.reducer(state, action);
        const expectedResult = {
            "mkb": {
                current: [],
                draft: [ deposit2, deposit3]
            }
        };

        expect(actualResult).toEqual(expectedResult);
    })
    it('should copy value by id', () => {

        const { id, bankId } = {
            id: "1",
            bankId: "mkb"
        };

        const state: DepositsState = {
            "mkb": {
                current: [],
                draft: [ deposit1, deposit2, deposit3]
            }
        };

        const action = depositsSlice.actions.handleCopy({ id, bankId });

        const actualResult = depositsSlice.reducer(state, action);

        expect(actualResult.mkb.draft).toHaveLength(4);
        expect(actualResult.mkb.draft[0]).toBe(deposit1);
        expect(actualResult.mkb.draft[2]).toBe(deposit2);
        expect(actualResult.mkb.draft[3]).toBe(deposit3);
        
        expect(actualResult.mkb.draft[1]).toEqual({
          ...deposit1,
          id: expect.any(String),
        });
        expect(actualResult.mkb.draft[1].id).not.toBe(deposit1.id);

    })
    it('should initialize deposit', () => {

        const update: UpdateEvent[] = [
            {
                date: "now",
                bankId: "mkb",
                deposits: []
            },
            {
                date: "now1",
                bankId: "bgfbank",
                deposits: []
            },
            {
                date: "now2",
                bankId: "bgfbank",
                deposits: []
            }
        ]

        const state = {}



        const action = depositsSlice.actions.initializeDeposits(update);

        const actualResult = depositsSlice.reducer(state, action);

        const expectedResult: DepositsState = {
            "mkb": {
                current: [],
                draft: []
            },
            "bgfbank": {
                current: [],
                draft: []
            }
        }

        expect(actualResult).toEqual(expectedResult);
    })
    it('should update deposits', () => {

        const updatedDeposit: Deposit = {
          bankId: "mkb",
          id: "1",
          rate: 77,
          term: 88,
          min: 99,
          max: 0,
          finuslugi: true,
          name: '',
          interest: "end",
          replenishment: 0,
          retiree: false,
          isNew: true,
          withdrawal: false,
        };
          
        const state: DepositsState = {
            "mkb": {
                current: [],
                draft: [ deposit1, deposit2, deposit3]
            }
        };



        const action = depositsSlice.actions.handleUpdate({
          bankId: "mkb",
          updatedDeposit
        });

        const actualResult = depositsSlice.reducer(state, action);
        
        const actualUpdatedDeposit = {
          bankId: "mkb",
          id: "XXX",
          rate: 77,
          term: 88,
          min: 99,
          max: 0,
          finuslugi: true,
          name: '',
          interest: "end",
          replenishment: 0,
          retiree: false,
          isNew: true,
          withdrawal: false,
        };
        expect(actualResult.mkb.draft).toEqual([actualUpdatedDeposit, deposit2, deposit3])

    })
    it('should add new empty form', () => {

        const state: DepositsState = {
            "mkb": {
                current: [],
                draft: [ deposit1, deposit2, deposit3]
            }
        };

        const emptyFormDeposit = emptyDeposit()

        const bankId = "mkb"

        const action = depositsSlice.actions.addNewForm(bankId)

        const actualResult = depositsSlice.reducer(state, action);
        
        const expectedResult = {...emptyFormDeposit, bankId}
        expect(actualResult.mkb.draft).toEqual([deposit1, deposit2, deposit3, expectedResult])

    })
    it('should change state', () => {

        const state: DepositsState = {
            "mkb": {
                current: [],
                draft: [ deposit1, deposit2, deposit3]
            }
        };

        const bankId = "mkb"

        const action = depositsSlice.actions.handleChangeState(bankId)

        const actualResult = depositsSlice.reducer(state, action);
        
        expect(actualResult.mkb.draft).toEqual([deposit1, deposit2, deposit3])
        expect(actualResult.mkb.current).toEqual([deposit1, deposit2, deposit3])

    })
})