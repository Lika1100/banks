import React from 'react'
import { useAppDispatch } from '../redux/store'
import { hideDeposit } from '../redux/preferencesSlice'

type PropsId = {
    id: string,
    className?: string,
}

export function HideDepositButton({id, className}: PropsId) {
  const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(hideDeposit(id))} className={className}>
        скрыть депозит
    </button>
  )
}
