import { Deposit } from "../types/types";
import { id2bank } from "../types/banks";
import s from "./DepositTable.module.css";
import { Column } from "./Table";
import { HonestDeposit } from "./DepositsTable";
import { ComeBackDepositButton } from "./ComeBackDepositButton";
import { Link } from "react-router-dom";

export const preferencesTableColumns:  Column<HonestDeposit>[] = [
    {
      title: "Банк",
      render(deposit) {
        const { logo, name } = id2bank[deposit.bankId!];
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
      render(deposit) {
        return (
          <span>{deposit.rate}%</span>
        )
      }
    },
    {
      title: "Процент ежемесячный",
      render(deposit) {
        return <span>{(deposit.honestRate * 100).toFixed(2)}%</span>
      }
    },
    {
      title: "Срок",
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
      title: "Вернуть депозит",
      render(deposit) {
        return <ComeBackDepositButton id={deposit.id} className={s.hideBank}/>
      }
    },
  ]