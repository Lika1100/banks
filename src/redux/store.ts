import { configureStore } from '@reduxjs/toolkit'
import { depositsSlice } from './depositsSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        deposits: depositsSlice.reducer, 
    }
})

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const selectState = (state: RootState) => state
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
