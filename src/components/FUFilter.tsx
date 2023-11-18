import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { setFinUslugi } from '../redux/filtersSlice';

export function FUFilter() {
    const filters = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();
    const isFU = filters.finuslugi
    function handleChangeFinUslugi(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setFinUslugi(event.target.checked))
    }
    return (
        <div>
            <input type='checkbox' checked={isFU} onChange={handleChangeFinUslugi}/>Фин услуги
        </div>
    )
}
