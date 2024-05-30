import React from 'react';
import { useAppDispatch } from '../redux/store';
import { setInterest } from '../redux/filtersSlice';
import s from "./InterestFilter.module.css";

export function InterestFilter() {
  const dispatch = useAppDispatch();
  function handleChangeInterest(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setInterest(event.target.value))
  }

  return (
    <div className={s.wrap}>
      <label className={s.radio}>
        <input className={s.radio__input} type='radio' value="all" name='interest' onChange={handleChangeInterest} defaultChecked />
        <div className={s.radio__state}>
          <div className={s.radio__control}>
            <div className={s.radio__check}></div>
          </div>
          <div className={s.radio__label}>Все</div>
        </div>
      </label>
      <label className={s.radio}>
        <input className={s.radio__input} type='radio' value="monthly" name='interest' onChange={handleChangeInterest} />
        <div className={s.radio__state}>
          <div className={s.radio__control}>
            <div className={s.radio__check}></div>
          </div>
          <div className={s.radio__label}>Ежемесячно</div>
        </div>
      </label>
      <label className={s.radio}>
        <input className={s.radio__input} type='radio' value="end" name='interest' onChange={handleChangeInterest} />
        <div className={s.radio__state}>
          <div className={s.radio__control}>
            <div className={s.radio__check}></div>
          </div>
          <div className={s.radio__label}>В конце</div>
        </div>
      </label>
    </div>
  )
}
