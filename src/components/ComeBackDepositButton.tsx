import React from 'react'
import { useAppDispatch } from '../redux/store'
import { comeBackDeposit } from '../redux/preferencesSlice';

type IdType = {
    id: string,
    className?: string
}

export function ComeBackDepositButton({id, className}: IdType) {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(comeBackDeposit(id))} className={className}>
        Вернуть депозит
    </button>
  )
}
