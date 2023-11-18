import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setInterest } from '../redux/filtersSlice';

export function InterestFilter() {
  const filters = useAppSelector(state => state.filters)
  const dispatch = useAppDispatch();
  function handleChangeInterest(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setInterest(event.target.value))
  }
  return (
    <div>
      <input type='radio' value="all" name='interest' onChange={handleChangeInterest} defaultChecked/> все
      <input type='radio' value="monthly" name='interest' onChange={handleChangeInterest}/> ежемесячно
      <input type='radio' value="end" name='interest' onChange={handleChangeInterest}/>в конце
    </div>
  )
}
