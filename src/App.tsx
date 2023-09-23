import { events } from "./types/data";
// @ts-ignore
import s from "./App.module.css";
import { id2bank } from "./types/banks";
import { Update } from "./components/Update";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux/store";
import { RootState } from "./redux/store";

export function App() {
    const navigate = useNavigate()
    function handleClick(bankId: string) {
        navigate(`/edit/${bankId}`)
    }
    const depositsStore = useAppSelector(state => state.deposits)
    const depositsSorted = Object.entries(depositsStore)
        .flatMap(([ bankId, {current}]) => current.map(deposit => ({ ...deposit, bankId })));
      
    console.log(depositsSorted, "???")
    return (
        <div>
            <table className={s.depositsList}>
                <tr className={s.deposit}>
                    <th>Банк</th>
                    <th>Ставка</th>
                    <th>Срок</th>
                    <th>Проценты</th>
                    <th>От</th>
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
        </div>
    );
}
