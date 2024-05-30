import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MAX_TERM, MIN_TERM, setMinTerm, setTermRange } from '../redux/filtersSlice';
import s from "./TermFilters.module.css";
import Filters from './Filters';

const termRange = [
  {
    name: "до 4",
    values: [MIN_TERM, 120]
  },
  {
    name: "от 4 до 6",
    values: [121, 200]
  },
  {
    name: "от 6 до 12",
    values: [201, 370]
  },
  {
    name: "более 12",
    values: [371, MAX_TERM]
  },
]

export function TermFilters() {
  const filters = useAppSelector(state => state.filters)
  const dispatch = useAppDispatch();
  const minTerm = filters.minTerm
  const maxTerm = filters.maxTerm
  function handleChangeMin(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setMinTerm(Number(event.target.value)))
  }
  function handleChangeMax(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setMinTerm(Number(event.target.value)))
  }
  function handleChangeRange(min: number, max: number) {
    dispatch(setTermRange([min, max]))
  }
  return (
    <div className={s.filters}>
      Срок
      <div className={s.filters__inputs}>
        <label className={s.filters__label}>
          <p className={s.filters__text}>от</p>
          <input type='text' value={minTerm} onChange={handleChangeMin} className={s.filters__input} />
        </label>
        <label className={s.filters__label}>
          <p className={s.filters__text}>до</p>
          <input type='text' value={maxTerm} onChange={handleChangeMax} className={s.filters__input} />
        </label>
        <Filters />
      </div>
      <div>
        {termRange.map(({ name, values }) =>
          <button onClick={() => handleChangeRange(values[0], values[1])} className={s.filters__button}>
            {name}
          </button>)}
      </div>
    </div>
  )
}
