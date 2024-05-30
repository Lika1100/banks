import { hideBank } from '../redux/preferencesSlice';
import { useAppDispatch } from '../redux/store';

type PropsBankId = {
    bankId: string,
    className?: string;
}

export function HideBankButton({bankId, className}: PropsBankId) {
    const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(hideBank(bankId!))} className={className}>
        скрыть банк
    </button>
  )
}
