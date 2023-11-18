import { useAppDispatch, useAppSelector } from '../redux/store';
import { getHonestRate } from '../domain/getHonestRate';
import { id2bank } from '../types/banks';
import s from "../App.module.css";
import { comeBackBank } from '../redux/preferencesSlice';
import { extractActualBlacklistDeposits } from '../domain/extractActualBlacklistDepositIds';
//import { TablePreferences } from './TablePreferences';

export function Preferences() {
  const hiddenBankIds = useAppSelector(state => state.preferences.hiddenBanks)
  const ids = useAppSelector(state => state.preferences.hiddenDeposits)
  const dispatch = useAppDispatch();
  
  const depositsStore = useAppSelector(state => state.deposits)
  const hiddenDeposits = extractActualBlacklistDeposits(ids, depositsStore, hiddenBankIds)
    .map((x) => {
      return {
        ...x,
        honestRate: getHonestRate(x.rate, x.term)
      }
    })
  console.log(hiddenDeposits)
  

  return (
    <>
      <h2>Черный список</h2>
      <ul>
        {hiddenBankIds.map((bankId) => {
          const { logo, name } = id2bank[bankId]
          return (
            <li>
              <img className={s.bankLogo} src={logo} /> {name}
              <button onClick={() => dispatch(comeBackBank(bankId))}>
                вернуть банк
              </button>
            </li>
          );
        })}
      </ul>
      {/* <TablePreferences deposits={hiddenDeposits} dispatch={dispatch}/> */}
    </>

  )
}
