import React from 'react'
import { useAppDispatch } from '../redux/store'
import { hideDeposit } from '../redux/preferencesSlice'

type PropsId = {
    id: string
}

export function HideDepositButton({id}: PropsId) {
  const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(hideDeposit(id))}>
        скрыть депозит
    </button>
  )
}
