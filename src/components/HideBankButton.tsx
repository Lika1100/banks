import { hideBank } from '../redux/preferencesSlice';
import { useAppDispatch } from '../redux/store';

type PropsBankId = {
    bankId: string
}

export function HideBankButton({bankId}: PropsBankId) {
    const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(hideBank(bankId!))}>
        скрыть банк
    </button>
  )
}
