import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Deposit, BankId, UpdateEvent } from "../types/types";

export type DepositsState = Record<BankId, { current: Deposit[], draft: Deposit[] }>
const initialState: DepositsState = {
};

export const emptyDeposit: () => Deposit = () => ({
  id: window.crypto.randomUUID(),
  rate: 0,
  term: 0,
  min: 0,
  max: 0,
  finuslugi: true,
  name: '',
  interest: "end",
  replenishment: 0,
  retiree: false,
  isNew: true,
  withdrawal: false,
});

// 1. Заполнять таблицу на главной странице данными из стора
// 2. На главной странице рядом с каждой строчкой добавить переход на страницу банка
// 3. На странице банка обновлять черновик через редакс
// 4. При сохранении черновика тоже обновлять стор в редаксе
// 5. добавить ещё один столбец и там пересчитать ставку в месяц
// 6. сделать сортировку по честной ставке и по сроку


// Когда меняем свойство вкалада обновляем у него id
// добавить action добавление нового вкалда с нуля (пустая форма)
// сдлеать список со всеми банками и оттуда на вести на страницу редактирования вкладов банка
export const depositsSlice = createSlice({
  name: "deposits",
  initialState,
  reducers: {
    initializeDeposits(state, action: PayloadAction<UpdateEvent[]>) {
      return Object.fromEntries(action.payload.map(({ bankId, deposits }) => [
        bankId,
        { current: deposits, draft: deposits },
      ]));
    },
    handleUpdate(state, action: PayloadAction<{ bankId: string, updatedDeposit: Deposit }>) {
      const { bankId, updatedDeposit } = action.payload
      const index = state[bankId].draft.findIndex((x) => x.id === updatedDeposit.id)
      state[bankId].draft[index] =  {
        ...updatedDeposit,
        id: window.crypto.randomUUID(),
      };
    },
    handleCopy: (state, action: PayloadAction<{ id: string, bankId: string }>) => {
      const { id, bankId } = action.payload
      const draftDepositIndex = state[bankId].draft.findIndex((x) => x.id === id)
      const depositCopy: Deposit = {
        ...state[bankId].draft[draftDepositIndex],
        id: window.crypto.randomUUID(),
      }
      state[bankId].draft.splice(draftDepositIndex + 1, 0, depositCopy)
    },
    handleRemove: (state, action: PayloadAction<{ id: string, bankId: string }>) => {
      const { id, bankId } = action.payload
      state[bankId].draft = state[bankId].draft.filter((x) => x.id !== id)
    },
    handleChangeState: (state, action: PayloadAction<string>) => {
      const bankId = action.payload;
      state[bankId].current = [...state[bankId].draft]
    },
    addNewForm: (state, action: PayloadAction<string>) => {
      const bankId = action.payload
      state[bankId] ??= {
        current: [],
        draft: [],
      }
      state[bankId].draft.push(emptyDeposit());
    }
  }
})

export const { handleUpdate, handleCopy, handleRemove, initializeDeposits, handleChangeState, addNewForm } = depositsSlice.actions
