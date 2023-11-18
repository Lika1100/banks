import React, { useState } from 'react'
import { Deposit } from '../types/types'
import s from "./Form.module.css"
import { useAppDispatch, useAppSelector } from '../redux/store';
import { handleCopy, handleRemove, handleUpdate } from '../redux/depositsSlice';

interface FormProps {
    deposit: Deposit;
    bankId: string
}

export function Form({ deposit, bankId }: FormProps) {
    const dispatch = useAppDispatch();
    function handleUpdateForm(updatedDeposit: Deposit) {
        dispatch(handleUpdate({
            bankId: bankId!,
            updatedDeposit,
        }))
    }
    function handleChangeText(event: React.ChangeEvent<HTMLInputElement>) {
        const key = event.target.name as keyof Deposit;
        const value = event.target.value;
        handleUpdateForm({ ...deposit, [key]: value })
    }
    function handleChangeInterest(interest: Deposit["interest"]) {
        handleUpdateForm({
            ...deposit,
            interest,
        })
    }
    function handleChangeNumber(event: React.ChangeEvent<HTMLInputElement>) {
        const key = event.target.name as keyof Deposit;
        const value = Number(event.target.value);
        handleUpdateForm({ ...deposit, [key]: value })
    }
    function handleChangeBoolean(event: React.ChangeEvent<HTMLInputElement>) {
        const key = event.target.name as keyof Deposit;
        const value = event.target.checked;
        handleUpdateForm({ ...deposit, [key]: value })
    }

    const currentValues = useAppSelector(state => state.deposits[bankId].current)
    const currentDeposit: Deposit | undefined = currentValues.find(({ id }) => deposit.id === id)

    function getColor(currentDeposit: Deposit | undefined, deposit: Deposit, key: keyof Deposit) {
        if (currentDeposit === undefined) {
            return "";
        }
        if (currentDeposit[key] !== deposit[key]) {
            return "yellow"
        } else {
            return ""
        }

    }


    // если такой депозит уже существует — подсвечиваем желтым измененные значения
    // если не существует — подсвечиваем зеленым всю строку

    // новые айдишники:
    // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
    // переделать редакс 

    return (
        <>
            <tr style={{ marginBottom: 12, padding: 4, background: currentDeposit === undefined ? "green" : undefined }}>
                <td className={s.nameLabel}>Name
                    <input
                        style={{ background: getColor(currentDeposit, deposit, "name") }}
                        type="text"
                        name='name'
                        value={deposit.name ?? ""}
                        onChange={handleChangeText}
                        className={s.nameInput} />
                </td>
                <td>Days
                    <input
                        style={{ background: getColor(currentDeposit, deposit, "term") }}
                        type='text'
                        name='term'
                        value={deposit.term}
                        onChange={handleChangeNumber} />
                </td>
                <td>Percents
                    <input
                        style={{ background: getColor(currentDeposit, deposit, "rate") }}
                        type='text'
                        name='rate'
                        value={deposit.rate}
                        onChange={handleChangeNumber}
                    />
                </td>
                <td>
                    <label className={s.radioLabel}>
                        <input
                            style={{ background: getColor(currentDeposit, deposit, "interest") }}
                            type='radio'
                            name={deposit.id + "interest"}
                            className={s.radioInput}
                            checked={deposit.interest === "end"}
                            value="end"
                            onChange={() => handleChangeInterest("end")}
                        />
                        end
                    </label>
                </td>
                <td>
                    <label className={s.radioLabel} style={{ background: getColor(currentDeposit, deposit, "interest") }}>
                        <input
                            type='radio'
                            name={deposit.id + "interest"}
                            className={s.radioInput}
                            checked={deposit.interest === "monthly"}
                            value="monthly"
                            onChange={() => handleChangeInterest("monthly")}
                        />
                        monthly
                    </label>
                </td>
                <td>Min
                    <input
                        style={{ background: getColor(currentDeposit, deposit, "min") }}
                        type='text'
                        name='min'
                        value={deposit.min}
                        onChange={handleChangeNumber} />
                </td>
                <td>Max
                    <input
                        style={{ background: getColor(currentDeposit, deposit, "max") }}
                        type="text"
                        name='max'
                        value={deposit.max}
                        onChange={handleChangeNumber} />
                </td>
                <td>Replenishment
                    <input
                        style={{ background: getColor(currentDeposit, deposit, "replenishment") }}
                        type="text"
                        name='replenishment'
                        value={deposit.replenishment}
                        onChange={handleChangeNumber} />
                </td>
                <td style={{ background: getColor(currentDeposit, deposit, "finuslugi") }}>
                    <input
                        type="checkbox"
                        name='finuslugi'
                        checked={deposit.finuslugi}
                        onChange={handleChangeBoolean} />FU
                </td>
                <td>
                    <input
                        type="checkbox"
                        name='retiree'
                        checked={deposit.retiree}
                        onChange={handleChangeBoolean} />Retiree
                </td>
                <td>
                    <input
                        type="checkbox"
                        name='isNew'
                        checked={deposit.isNew}
                        onChange={handleChangeBoolean} />New
                </td>
                <td>
                    <input
                        type="checkbox"
                        name='withdrawal'
                        checked={deposit.withdrawal}
                        onChange={handleChangeBoolean} />Withdrawal
                </td>
                <td>
                    <button onClick={() => dispatch(handleCopy({ id: deposit.id, bankId: bankId! }))} style={{ height: "50%" }}> + </button>
                </td>
                <td>
                    <button onClick={() => dispatch(handleRemove({ id: deposit.id, bankId: bankId! }))} style={{ height: "50%" }}> - </button>
                </td>
            </tr>
        </>
    )
}
