import { useState } from "react"
// @ts-ignore
import s from "../App.module.css";
import { id2bank } from "../types/banks";
import { Update } from "./Update";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { RootState } from "../redux/store";
import { Deposit } from "../types/types";
import { getHonestRate } from "../domain/getHonestRate";

type SortKey = "term" | "rate" | "honestRate" | "min" | "max";

export function Table() {
    const [sorted, setSorted] = useState<{ key: SortKey, desc: 1 | -1 }>({
        key: "honestRate",
        desc: -1,
    })
    const filters = useAppSelector(state => state.filters)
    console.log(filters)
    // сдлеать фильтры и сделать сортировку (sortSlice)
    const navigate = useNavigate()
    function handleClick(bankId: string) {
        navigate(`/edit/${bankId}`)
    }

    const depositsStore = useAppSelector(state => state.deposits)
    const deposits = Object.entries(depositsStore)
        .flatMap(([bankId, { current }]) => current.map(deposit => ({
            ...deposit,
            bankId,
            honestRate: getHonestRate(deposit.rate, deposit.term)
        })))

    const depositsSorted = [...deposits]
      .filter((deposit) => deposit.term >= filters.minTerm && deposit.term <= filters.maxTerm)
      .sort((a, b) => (a[sorted.key] - b[sorted.key]) * sorted.desc);
    function handleClickSorted(key: SortKey) {
        setSorted((prev) => {
            return {
                key: key,
                desc: prev.key === key ? (prev.desc === -1 ? 1 : -1) : -1
            }
        })
    }

    return (
        <table className={s.depositsList}>
            <tr className={s.deposit}>
                <th>Банк</th>
                <th>
                    <button onClick={() => handleClickSorted("rate")}>
                        Ставка
                    </button>
                </th>
                <th>
                    <button onClick={() => handleClickSorted("honestRate")}>
                        Процент ежемесячный
                    </button>
                </th>
                <th>
                    <button onClick={() => handleClickSorted("term")}>
                        Срок
                    </button>
                </th>
                <th>Проценты</th>
                <th>
                    <button onClick={() => handleClickSorted("min")}>
                        От
                    </button>
                </th>
                <th>ФУ</th>
                <th>Пенс</th>
                <th>Новый</th>
                <th>Пополняемый</th>
                <th>Форма</th>
            </tr>

            {depositsSorted.map((deposit) => {
                const { logo, name } = id2bank[deposit.bankId];

                return (
                    <tr className={s.deposit}>
                        <td><img className={s.bankLogo} src={logo} /> {name}</td>
                        <td>{deposit.rate}%</td>
                        <td>{(deposit.honestRate * 100).toFixed(2)}%</td>
                        <td>{deposit.term}</td>
                        <td>{deposit.interest === "end" ? "в конце" : "ежемесячно"}</td>
                        <td>{deposit.min}</td>
                        <td>{deposit.finuslugi ? "+" : ""}</td>
                        <td>{deposit.retiree ? "+" : ""}</td>
                        <td>{deposit.isNew ? "+" : ""}</td>
                        <td>{deposit.replenishment === 0 ? "" : deposit.replenishment}</td>
                        <td>
                            <button onClick={() => handleClick(deposit.bankId)}>click</button>
                        </td>
                    </tr>
                );
            })}
        </table>
    )
}
