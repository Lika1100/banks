import React, { useState } from 'react'
import { Deposit } from '../types/types'
import s from "./Form.module.css"

type UpdateDepositValueHandler<T extends keyof Deposit> = (key: T, value: Deposit[T]) => void;

interface FormProps {
    deposit: Deposit;
    onValueChange: UpdateDepositValueHandler<keyof Deposit>;
}

export function Form({deposit, onValueChange}: FormProps) {
    function handleChangeText(event: React.ChangeEvent<HTMLInputElement>) {
        onValueChange(event.target.name as keyof Deposit, event.target.value)
    }
    function handleChangeNumber(event: React.ChangeEvent<HTMLInputElement>) {
        onValueChange(event.target.name as keyof Deposit, Number(event.target.value))
    }
    function handleChangeBoolean(event: React.ChangeEvent<HTMLInputElement>) {
        onValueChange(event.target.name as keyof Deposit, event.target.checked)
    }

    return (
        <form method='post' style={{ display: "flex", flexDirection: "column", maxWidth: "180px" }}>
            <label className={s.nameLabel}>Name
                <input
                    type="text"
                    name='name'
                    value={deposit.name}
                    onChange={handleChangeText}
                    className={s.nameInput} />
            </label>
            <label>Days
                <input
                    type='text'
                    name='term'
                    value={deposit.term}
                    onChange={handleChangeNumber} />
            </label>
            <label>Percents
                <input
                    type='text'
                    name='rate'
                    value={deposit.rate}
                    onChange={handleChangeNumber}
                />
            </label>
            <div className={s.wrapRadio}>
                <label className={s.radioLabel__end}>
                    <input
                        type='radio'
                        name='interest'
                        className={s.radioInput__end}
                        checked={deposit.interest === "end"}
                        value="end"
                        onChange={handleChangeText} />
                </label>
                <label className={s.radioLabel__month}>
                    <input
                        type='radio'
                        name='interest'
                        className={s.radioInput__month}
                        checked={deposit.interest === "monthly"}
                        value="monthly"
                        onChange={handleChangeText}
                    />
                </label>
            </div>
            <label>Min
                <input
                    type='text'
                    name='min'
                    value={deposit.min}
                    onChange={handleChangeNumber} />
            </label>
            <label>Max
                <input
                    type="text"
                    name='max'
                    value={deposit.max}
                    onChange={handleChangeNumber} />
            </label>
            <label>Replenishment
                <input
                    type="text"
                    name='replenishment'
                    value={deposit.replenishment}
                    onChange={handleChangeNumber} />
            </label>
            <label>
                <input
                    type="checkbox"
                    name='finuslugi'
                    checked ={deposit.finuslugi}
                    onChange={handleChangeBoolean} />FU
            </label>
            <label>
                <input
                    type="checkbox"
                    name='retiree'
                    checked ={deposit.retiree}
                    onChange={handleChangeBoolean} />Retiree
            </label>
            <label>
                <input
                    type="checkbox"
                    name='isNew'
                    checked={deposit.isNew}
                    onChange={handleChangeBoolean} />New
            </label>
            <label>
                <input
                    type="checkbox"
                    name='withdrawal'
                    checked={deposit.withdrawal}
                    onChange={handleChangeBoolean} />Withdrawal
            </label>
        </form>
    )
}
