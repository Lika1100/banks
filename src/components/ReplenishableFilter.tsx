import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setReplenishable } from '../redux/filtersSlice';

export function ReplenishableFilter() {
    const filters = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();
    const isReplenishable = filters.replenishable
    function handleChangeReplenishable(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setReplenishable(event.target.checked))
    }
    return (
        <div>
            <input type='checkbox' checked={isReplenishable} onChange={handleChangeReplenishable}/> Пополняемый
        </div>
    )
}
