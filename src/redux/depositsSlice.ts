import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Deposit, BankId } from "../types/types";
import { mkbEvent, bgfEvent, giEvent, itbEvent } from "../types/data";

// Record<BankId, { current: Deposit[], draft: Deposit[] }>
const initialState: Record<BankId, { current: Deposit[], draft: Deposit[] }> = {
  "mkb": {
    current: mkbEvent.deposits,
    draft: mkbEvent.deposits,
  },
  "bgfbank": {
    current: bgfEvent.deposits,
    draft: bgfEvent.deposits,
  },
  "garant-invest": {
    current: giEvent.deposits,
    draft: giEvent.deposits
  },
  "investtorgbank": {
    current: itbEvent.deposits,
    draft: itbEvent.deposits
  }
};

// 1. Заполнять таблицу на главной странице данными из стора
// 2. На главной странице рядом с каждой строчкой добавить переход на страницу банка
// 3. На странице банка обновлять черновик через редакс
// 4. При сохранении черновика тоже обновлять стор в редаксе
// 5. добавить ещё один столбец и там пересчитать ставку в месяц
// 6. сделать сортировку по честной ставке и по сроку
export const depositsSlice = createSlice({
    name: "deposits",
    initialState,
    reducers: {
      handleUpdate(state, action: PayloadAction<{id: number, bankId: string, depositUpdate: Partial<Deposit>}>) {
        const {id, bankId, depositUpdate} = action.payload
        Object.assign(state[bankId].draft[id], depositUpdate)
      },
      handleCopy: (state, action: PayloadAction<{id: number, bankId: string }>) => {
        const {id, bankId} = action.payload
        const currentDeposits = state[bankId].draft
        currentDeposits.push({...currentDeposits[id]})
      },
      handleRemove: (state, action: PayloadAction<{id: number, bankId: string }>) => {
        const {id, bankId} = action.payload
        const currentDeposits = state[bankId].draft
        currentDeposits.splice(id, 1)
      }
    }
})

export const {handleUpdate, handleCopy, handleRemove} = depositsSlice.actions

// initialState[BankId].draft