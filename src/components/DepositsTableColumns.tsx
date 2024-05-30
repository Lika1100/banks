import { Link } from "react-router-dom";
import { id2bank } from "../types/banks";
import s from "./DepositTable.module.css";
import { HonestDeposit } from "./DepositsTable";
import { HideBankButton } from "./HideBankButton";
import { HideDepositButton } from "./HideDepositButton";
import { Column } from "./Table";


export const depositsTableColumns: Column<HonestDeposit>[] = [
  {
    title: "Банк",
    render(deposit) {
      const { logo, name } = id2bank[deposit.bankId];
      return (
        <div className={s.bank}>
          <img src={logo} className={s.bank__img}/>
          {name}
        </div>
      )
    }
  },
  {
    title: "Ставка",
    sortKey: "rate",
    render(deposit) {
      return (
        <span>
          {deposit.rate}%
        </span>
      )
    }
  },
  {
    title: "Процент ежемесячный",
    sortKey: "honestRate",
    render(deposit) {
      return <span>{(deposit.honestRate * 100).toFixed(2)}%</span>
    }
  },
  {
    title: "Срок",
    sortKey: "term",
    render(deposit) {
      return <span>{deposit.term}</span>
    }
  },
  {
    title: "Проценты",
    render(deposit) {
      return <span>{deposit.interest === "end" ? "в конце" : "ежемесячно"}</span>
    }
  },
  {
    title: "От",
    sortKey: "min",
    render(deposit) {
      return <span>{deposit.min}</span>
    }
  },
  {
    title: "ФУ",
    render(deposit) {
      return <span>{deposit.finuslugi ? "+" : ""}</span>
    }
  },
  {
    title: "Пенс",
    render(deposit) {
      return <span>{deposit.retiree ? "+" : ""}</span>
    }
  },
  {
    title: "Новый",
    render(deposit) {
      return <span>{deposit.isNew ? "+" : ""}</span>
    }
  },
  {
    title: "Пополняемый",
    render(deposit) {
      return <span>{deposit.replenishment === 0 ? "" : deposit.replenishment}</span>
    }
  },
  {
    title: "Форма",
    render(deposit) {
      return <Link to={`/edit/${deposit.bankId}`} className={s.edit}>Редактировать</Link>
    }
  },
  {
    title: "Скрыть банк",
    render(deposit) {
      return <HideBankButton bankId={deposit.bankId!} className={s.hideBank}/>
    }
  },
  {
    title: "Скрыть депозит",
    render(deposit) {
      return <HideDepositButton id={deposit.id} className={s.hideBank}/>
    }
  },
]