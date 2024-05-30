import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpecificTypeKeys } from "../components/Table";
import { HonestDeposit } from "../components/DepositsTable";

export type HonestDepositSortKey = SpecificTypeKeys<HonestDeposit, number>;
export interface Sorted {
  key: HonestDepositSortKey,
  desc: number,
}

const initialState: Sorted = {
  key: "honestRate",
  desc: -1
}


export const sortSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<HonestDepositSortKey>) {
      if (state.key === action.payload) {
        state.desc = state.desc === -1 ? 1 : -1
      } else {
        state.key = action.payload
        state.desc = -1
      }
      //state.key === action.payload ? (state.desc === -1 ? state.desc = 1 : state.desc = -1) : state.desc = -1
    },
  }
})

export const { setSort } = sortSlice.actions