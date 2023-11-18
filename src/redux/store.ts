import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { depositsSlice, initializeDeposits } from './depositsSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterSlice } from './filtersSlice';
import { sortSlice } from './sortSlice';
import { getEventsSlice } from '../api/getEventsSlice';
import { comeBackBank, comeBackDeposit, hideBank, hideDeposit, preferencesSlice } from './preferencesSlice';
import type { TypedStartListening } from '@reduxjs/toolkit';


const listenerMiddleware = createListenerMiddleware();
export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening


// https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
startAppListening({
    matcher: isAnyOf(hideBank, hideDeposit, comeBackBank, comeBackDeposit), // добавить все
    effect: (action, listenerApi) => {
        //console.log(action.payload, "action", listenerApi.getState())
        const {preferences} = listenerApi.getState()
        
        localStorage.setItem("preferences", JSON.stringify(preferences))
    }
})

export const store = configureStore({
    reducer: {
        deposits: depositsSlice.reducer, 
        filters: filterSlice.reducer,
        sorted: sortSlice.reducer,
        preferences: preferencesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

getEventsSlice(
    // new Date(2023, 8, 22)
).then(deposits => {
    store.dispatch(initializeDeposits(deposits));
});




export type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const selectState = (state: RootState) => state
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
