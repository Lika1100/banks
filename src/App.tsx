import {events} from "./types/data";
// @ts-ignore
import s from "./App.module.css";
import {banks, id2bank} from "./types/banks";


const favs = [
    "Ростфинанс",
    "Камкомбанк",
    "Почта Банк",
    "Таврический",
    "Зираат Банк",
    "ТрансКапиталБанк",
    "Всероссийский Банк Развития Регионов",
    "Севергазбанк",
    "Кредит Урал Банк",
    "СИАБ",
    "СДМ-Банк",
    "Акцепт",
    "НС Банк",
    "ББР Банк",
    "Русский стандарт",
    "Ренессанс",
    "Вологжанин",
    "Глобус",
    "Еврофинанс Моснарбанк",
    "Росбанк",
    "МТС",
    "Синара",
    "Металлинвест",
    "Газпромбанк",
    "Ренессанс",
    "ПримСоцбанк",
    "Экспо",
    "Локо",
    "СДМ",
    "кредит европа банк",
    "Яндекс банк",
    "ДОМ.РФ",
    "Первоуральск",
    "Альфа",
    "Тинькофф",
    "Солидарность",
    "Уралсиб",
    "Солид",
    "Сбер",
    "Новикомбанк",
    "Азиатско-Тихоокеанский Банк",
];

console.log(favs.filter(name => !banks.some(x => x.name.toLowerCase().includes(name.toLowerCase()))))

export function App() {
    const deposits = events.flatMap(({deposits, bankId}) => {
        return deposits.map(deposit => ({...deposit, bankId}));
    }).sort((a, b) => b.rate - a.rate);


    const banksDone = banks.filter(b => b.url);

    const banksNext = banks.filter(b => !b.url).filter(x => favs.some(name => x.name.toLowerCase().includes(name.toLowerCase())));
    const banksRest = banks.filter(b => !b.url).filter(x => !favs.some(name => x.name.toLowerCase().includes(name.toLowerCase())));


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
            </tr>

            {deposits.map((deposit) => {
                const {logo, name} = id2bank[deposit.bankId];

                return (
                    <tr className={s.deposit}>
                        <td><img className={s.bankLogo} src={logo} /> {name}</td>
                        <td>{deposit.rate}%</td>
                        <td>{deposit.term}</td>
                        <td>{deposit.interest === "end" ? "в конце" : "ежемесячно"}</td>
                        <td>{deposit.min}</td>
                        <td>{deposit.finuslugi ? "+" : ""}</td>
                        <td>{deposit.retiree ? "+" : ""}</td>
                        <td>{deposit.new ? "+" : ""}</td>
                        <td>{deposit.replenishment === 0 ? "" : deposit.replenishment}</td>
                    </tr>
                );
            })}
        </table>
            <ul className={s.banksList}>
                {banksDone.map(bank => {
                    const {logo, name, url} = bank;

                    return (
                        <li>
                            <img className={s.bankLogo} src={logo} /> <a target="_blank" href={url}>{name}</a>
                        </li>
                    )
                })}
            </ul>
            <hr/>
            <ul className={s.banksList}>
                {banksNext.map(bank => {
                    const {logo, name} = bank;

                    return (
                        <li>
                            <img className={s.bankLogo} src={logo} /> {name}
                        </li>
                    )
                })}
            </ul>

            <hr/>
            <ul className={s.banksList}>
                {banksRest.map(bank => {
                    const {logo, name} = bank;

                    return (
                        <li>
                            <img className={s.bankLogo} src={logo} /> {name}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}
