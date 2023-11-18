import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Hidden  {
    hiddenBanks: string[],
    hiddenDeposits: string[]
}
// из локал если есть записывать, если нет значение по дефолту
// показывать скрытые депозиты только таких банков которые не внесены в чёрный список
const defaultState: Hidden = {
    "hiddenBanks": [],
    "hiddenDeposits": []
}

function getInitialState() {
    const json = localStorage.getItem("preferences")
    if (json === null) {
        return defaultState
    }
    const obj = JSON.parse(json)
    console.log(obj)
    return obj
}
const initialState: Hidden = getInitialState()
//   A 1
//   A 2 
//   B 3
//   B 4

// таблицу целиком переиспользовать

// в черном списке депозитов
// показываются актуальные скрытые депозиты нескрытых банков

// про актуальность
// если вы скрыли депозит, потом депозиты банка обновились,
// то этот депозит больше не показываем в скрытых

//  скрыли A1
//  на главной показываем A2, B3, B4.
//  в настройках — банки пустые, депозиты — А1

//  скрыли банк A
//  на главной показываем B3, B4.
//  в настройках — банки A, депозиты — пустые

export const preferencesSlice = createSlice({
    name: "preferences",
    initialState,
    reducers: {
        hideBank: (state, action: PayloadAction<string>) => {
            const bankId = action.payload
            state.hiddenBanks.push(bankId)
        },
        hideDeposit: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.hiddenDeposits.push(id)
        },
        comeBackBank: (state, action: PayloadAction<string>) => {
            const bankId = action.payload
            state.hiddenBanks = state.hiddenBanks.filter((x: string) => x !== bankId)
        },
        comeBackDeposit: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.hiddenDeposits = state.hiddenDeposits.filter((x: string) => x !== id)
        }
    }
})

//в таблицу добавить кнопки
// черный список два раздела: список банков, список депозитов + кнопки всё вернуть
// решить задачу, поставить 100 баллов

export const {hideBank, hideDeposit, comeBackBank, comeBackDeposit} = preferencesSlice.actions