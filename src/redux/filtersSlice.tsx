import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  minTerm: number,
  maxTerm: number,
  retiree: boolean,        // если false, то скрывать
  finuslugi: boolean,
  replenishable: boolean, // если true, то только пополняемые
  interest: "monthly" | "end" | "all",

}

export const MIN_TERM = 1;
export const MAX_TERM = 2000;

const initialState = {
  minTerm: MIN_TERM,
  maxTerm: MAX_TERM,
  retiree: true,
  finuslugi: true,
  replenishable: false,
  interest: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setMinTerm(state, action: PayloadAction<number>) {
      state.minTerm = action.payload;
    },
    setMaxTerm(state, action: PayloadAction<number>) {
      state.minTerm = action.payload;
    },
    setTermRange(state, action: PayloadAction<[number, number]>) {
      const [min, max] = action.payload;
      state.minTerm = min;
      state.maxTerm = max;
    },
    setIsRetiree(state, action: PayloadAction<boolean>) {
      state.retiree = action.payload;
    },
    setFinUslugi(state, action: PayloadAction<boolean>) {
      state.finuslugi = action.payload
    },
    setReplenishable(state, action: PayloadAction<boolean>) {
      state.replenishable = action.payload
    }, 
    setInterest(state, action: PayloadAction<string>) {
      state.interest = action.payload
    }
  }
})

export const { setMaxTerm, setMinTerm, setTermRange, setIsRetiree, setFinUslugi, setReplenishable, setInterest} = filterSlice.actions