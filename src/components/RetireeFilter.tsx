import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { setIsRetiree } from '../redux/filtersSlice';

export function RetireeFilter() {
  const filters = useAppSelector(state => state.filters)
  const dispatch = useAppDispatch();
  const isRetiree = filters.retiree
  function handleChangeRetiree(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setIsRetiree(event.target.checked))
  }
  return (
    <div>
        <input type='checkbox' checked={isRetiree} onChange={handleChangeRetiree}/>Пенсионерам
    </div>
  )
}
