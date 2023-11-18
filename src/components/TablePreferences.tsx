
import React from 'react'

export function TablePreferences() {
  return (
    <div>TablePreferences</div>
  )
}

/* import { preferencesTableColumns } from "./PreferencesTableColumns";
import { Deposit } from "../types/types";
import s from "../App.module.css";
import { SortedDeposit } from "./DepositsTable";
import { hideBank, hideDeposit } from '../redux/preferencesSlice';


export function TablePreferences({ deposits /*columns*/ 
    // интерфейс описать для тэйбл
    // TableCopy переделать через Table эту
    // сделать ссылками всё что что ссылки
    // фильтрация в App
    // сделать всем bankId
   /*  return (
        <table className={s.depositsList}>
            <tr className={s.deposit}>
                {preferencesTableColumns.map(({ title }) => {
                    return (
                        <th>
                            {title}
                        </th>
                    )
                })}
            </tr>
            <>
                {deposits.map((deposit: Deposit) => {
                    return (
                        <tr className={s.deposit}>
                            {preferencesTableColumns.map(({render}) => <td>{render(deposit, dispatch)}</td>)}
                        </tr>
                    )
                })}
            </>
            <a href={`/`}>вернуться на главную</a>
        </table>
    ) */