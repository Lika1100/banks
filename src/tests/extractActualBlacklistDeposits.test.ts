import { DepositsState } from './../redux/depositsSlice';
import { extractActualBlacklistDeposits } from "../domain/extractActualBlacklistDepositIds";
import { Deposit } from '../types/types';

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
const deposit4: Deposit = {
    bankId: "mkb",
    id: "4",
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

describe('function getHonestRate', function () {
    it('should generate actual blacklist', () => {
        const hiddenBanksIds: string[] = []
        const hiddenDepositsIds: string[] = []
        const depositsState: DepositsState = {
            "mkb": {
                current: [deposit1, deposit2, deposit3],
                draft: []
            }
        }

        const actualResult = extractActualBlacklistDeposits(hiddenDepositsIds, depositsState, hiddenBanksIds)
        const expectedResult: Deposit[] = []
        expect(actualResult).toEqual(expectedResult)
    })
    it('should generate actual blacklist', () => {
        const hiddenBanksIds: string[] = []
        const hiddenDepositsIds: string[] = ["1"]
        const depositsState: DepositsState = {
            "mkb": {
                current: [deposit1, deposit2, deposit3],
                draft: []
            }
        }

        const actualResult = extractActualBlacklistDeposits(hiddenDepositsIds, depositsState, hiddenBanksIds)
        const expectedResult: Deposit[] = [deposit1]
        expect(actualResult).toEqual(expectedResult)
    })
    it('should generate actual blacklist', () => {
        const hiddenBanksIds: string[] = ["mkb"]
        const hiddenDepositsIds: string[] = ["1"]
        const depositsState: DepositsState = {
            "mkb": {
                current: [deposit1, deposit2, deposit3],
                draft: []
            }
        }

        const actualResult = extractActualBlacklistDeposits(hiddenDepositsIds, depositsState, hiddenBanksIds)
        const expectedResult: Deposit[] = []
        expect(actualResult).toEqual(expectedResult)
    })
    it('should generate actual blacklist', () => {
        const hiddenBanksIds: string[] = ["sber"]
        const hiddenDepositsIds: string[] = ["1", "4"]
        const depositsState: DepositsState = {
            "mkb": {
                current: [deposit1, deposit2, deposit3, deposit4],
                draft: []
            }
        }

        const actualResult = extractActualBlacklistDeposits(hiddenDepositsIds, depositsState, hiddenBanksIds)
        const expectedResult: Deposit[] = [deposit1, deposit4]
        expect(actualResult).toEqual(expectedResult)
    })
})