import { Deposit } from "../types/types";
import { id2bank } from "../types/banks";
import s from "../App.module.css";
import { comeBackDeposit, hideBank, hideDeposit } from '../redux/preferencesSlice';

/* export const preferencesTableColumns = [
    {
      title: "Банк",
      render(deposit: Deposit) {
        const { logo, name } = id2bank[deposit.bankId!];
        return (
          <div>
            <img src={logo} className={s.bankLogo}/>
            {name}
          </div>
        )
      }
    },
    {
      title: "Ставка",
      render(deposit: Deposit) {
        return (
          <span>{deposit.rate}%</span>
        )
      }
    },
    {
      title: "Процент ежемесячный",
      render(deposit: Deposit & SortedDeposit) {
        return <span>{(deposit.honestRate * 100).toFixed(2)}%</span>
      }
    },
    {
      title: "Срок",
      render(deposit: Deposit & SortedDeposit) {
        return <span>{deposit.term}</span>
      }
    },
    {
      title: "Проценты",
      render(deposit: Deposit) {
        return <span>{deposit.interest === "end" ? "в конце" : "ежемесячно"}</span>
      }
    },
    {
      title: "От",
      render(deposit: Deposit) {
        return <span>{deposit.min}</span>
      }
    },
    {
      title: "ФУ",
      render(deposit: Deposit) {
        return <span>{deposit.finuslugi ? "+" : ""}</span>
      }
    },
    {
      title: "Пенс",
      render(deposit: Deposit) {
        return <span>{deposit.retiree ? "+" : ""}</span>
      }
    },
    {
      title: "Новый",
      render(deposit: Deposit) {
        return <span>{deposit.isNew ? "+" : ""}</span>
      }
    },
    {
      title: "Пополняемый",
      render(deposit: Deposit) {
        return <span>{deposit.replenishment === 0 ? "" : deposit.replenishment}</span>
      }
    },
    {
      title: "Форма",
      render(deposit: Deposit) {
        return <a href={`/edit/${deposit.bankId}`}>click</a>
      }
    },
    {
      title: "Вернуть депозит",
      render(deposit: Deposit, dispatch: (arg0: { payload: string;}) => void) {
        return <button onClick={() => dispatch(comeBackDeposit(deposit.id))}>вернуть депозит</button>
      }
    },
  ] */