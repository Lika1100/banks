import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { setIsRetiree } from '../redux/filtersSlice';
import s from "./RetireeFilter.module.css";

export function RetireeFilter() {
  const filters = useAppSelector(state => state.filters)
  const dispatch = useAppDispatch();
  const isRetiree = filters.retiree
  function handleChangeRetiree(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setIsRetiree(event.target.checked))
  }
  return (
    <label className={s.checkbox}>
    <input type='checkbox' checked={isRetiree} onChange={handleChangeRetiree} className={s.checkbox__input}/>
    <div className={s.checkbox__state}>
        <div className={s.checkbox__control}>
            <svg width="15" height="13" className="s.checkbox__icon" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 7.5L5 11L13 2" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>    
        </div>
        <div className={s.checkbox__label}>
          Пенсионерам
        </div>
    </div>
</label>
)}
