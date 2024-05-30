import { useAppDispatch, useAppSelector } from '../redux/store';
import { getHonestRate } from '../domain/getHonestRate';
import { id2bank } from '../types/banks';
import { comeBackBank } from '../redux/preferencesSlice';
import { extractActualBlacklistDeposits } from '../domain/extractActualBlacklistDepositIds';
import { Table } from './Table';
import { preferencesTableColumns } from './PreferencesTableColumns';
import { Link } from 'react-router-dom';
import IconBack from './IconBack';
import styles from "./Preferences.module.css";
import Header from './Header';
import Container from './Container';

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



  return (
    <Container>
      <div className={styles.wrap}>
        <Header />
        <h2>Черный список</h2>
        <Link to="/">
          <IconBack className={styles.back} />
        </Link>
        <div>
          <p>Список банков</p>
          {hiddenBankIds.map((bankId) => {
            const { logo, name } = id2bank[bankId]
            return (
              <div className={styles.bank}>
                <img className={styles.bank__img} src={logo} /> {name}
                <button onClick={() => dispatch(comeBackBank(bankId))} className={styles.hideBank}>
                  вернуть банк
                </button>
              </div>
            );
          })}
        </div>
        <p>Список Депозитов</p>
        <Table data={hiddenDeposits} columns={preferencesTableColumns} />
      </div>
    </Container>
  )
}
