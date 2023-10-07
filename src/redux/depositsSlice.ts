import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Deposit, BankId } from "../types/types";
import { mkbEvent, bgfEvent, giEvent, itbEvent } from "../types/data";
import crypto from "crypto";

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
      handleUpdate(state, action: PayloadAction<{bankId: string, updatedDeposit: Deposit}>) {
        const { bankId, updatedDeposit } = action.payload
        const index = state[bankId].draft.findIndex((x) => x.id === updatedDeposit.id)
        state[bankId].draft[index] = updatedDeposit;
      },
      handleCopy: (state, action: PayloadAction<{id: string, bankId: string }>) => {
        const {id, bankId} = action.payload
        const draftDepositIndex = state[bankId].draft.findIndex((x) => x.id === id)
        const depositCopy: Deposit = {
          ...state[bankId].draft[draftDepositIndex],
          id: window.crypto.randomUUID(),
        }
        state[bankId].draft.splice(draftDepositIndex + 1, 0, depositCopy)
      },
      handleRemove: (state, action: PayloadAction<{id: string, bankId: string }>) => {
        const {id, bankId} = action.payload
        state[bankId].draft = state[bankId].draft.filter((x) => x.id !== id)
      }
    }
})

export const {handleUpdate, handleCopy, handleRemove} = depositsSlice.actions
