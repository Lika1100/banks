import React from 'react'
import { Deposit } from '../types/types'
import s from "./Form.module.css"
import { useAppDispatch, useAppSelector } from '../redux/store';
import { handleCopy, handleRemove, handleUpdate } from '../redux/depositsSlice';
import cn from "classnames";
import 'pretty-checkbox'

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
    const currendiveposit: Deposit | undefined = currentValues.find(({ id }) => deposit.id === id)


    // если такой депозит уже существует — подсвечиваем желтым измененные значения
    // если не существует — подсвечиваем зеленым всю строку

    // новые айдишники:
    // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
    // переделать редакс 

    return (
        <>
            <div className={s.table}>
                <div className={s.column}>Name
                    <input
                        type="text"
                        name='name'
                        value={deposit.name ?? ""}
                        onChange={handleChangeText}
                        className={s.nameInput} />
                </div>
                <div className={s.column}>Days
                    <input
                        type='text'
                        name='term'
                        value={deposit.term}
                        className={cn(s.nameInput, s.term)}
                        onChange={handleChangeNumber} />
                </div>
                <div className={s.column}>Percents
                    <input
                        type='text'
                        name='rate'
                        value={deposit.rate}
                        className={cn(s.nameInput, s.term)}
                        onChange={handleChangeNumber}
                    />
                </div>
                <div className={s.column}>End
                    <div className="pretty p-switch">
                        <input
                            type="radio"
                            name={deposit.id + "switch1"}
                            value="end"
                            onChange={() => handleChangeInterest("end")}
                            checked={deposit.interest === "end"} />
                        <div className="state p-success">
                            <label></label>
                        </div>
                    </div>
                </div>
                <div className={s.column}>Monthly
                    <div className="pretty p-switch">
                        <input
                            type="radio"
                            name={deposit.id + "switch1"}
                            checked={deposit.interest === "monthly"}
                            value="monthly"
                            onChange={() => handleChangeInterest("monthly")} />
                        <div className="state p-success">
                            <label></label>
                        </div>
                    </div>
                </div>
                <div className={s.column}>Min
                    <input
                        type='text'
                        name='min'
                        value={deposit.min}
                        className={s.nameInput}
                        onChange={handleChangeNumber} />
                </div>
                <div className={s.column}>Max
                    <input
                        type="text"
                        name='max'
                        value={deposit.max}
                        className={s.nameInput}
                        onChange={handleChangeNumber} />
                </div>
                <div className={s.column}>Replenishment
                    <input
                        type="text"
                        name='replenishment'
                        value={deposit.replenishment}
                        className={cn(s.nameInput, s.term)}
                        onChange={handleChangeNumber} />
                </div>
                <div className={s.column}>
                    <div className={cn("pretty p-default", s.columnCheck)}>
                        <input
                            name='finuslugi'
                            checked={deposit.finuslugi}
                            onChange={handleChangeBoolean}
                            type="checkbox" />
                        <div className="state p-success">
                            <label>FinServ</label>
                        </div>
                    </div>
                </div>
                <div className={s.column}>
                    <div className="pretty p-default">
                        <input
                            name='retiree'
                            checked={deposit.retiree}
                            onChange={handleChangeBoolean}
                            type="checkbox" />
                        <div className="state p-success">
                            <label>Retiree</label>
                        </div>
                    </div>
                </div>
                <div className={s.column}>
                    <div className="pretty p-default">
                        <input
                            name='isNew'
                            checked={deposit.isNew}
                            onChange={handleChangeBoolean}
                            type="checkbox" />
                        <div className="state p-success">
                            <label>New</label>
                        </div>
                    </div>
                </div>
                <div className={s.column}>
                    <div className="pretty p-default">
                        <input
                            name='withdrawal'
                            checked={deposit.withdrawal}
                            onChange={handleChangeBoolean}
                            type="checkbox" />
                        <div className="state p-success">
                            <label>Withdrawal</label>
                        </div>
                    </div>
                </div>
                <div className={s.column}>
                    <button onClick={() => dispatch(handleRemove({ id: deposit.id, bankId: bankId! }))} className={s.button}> - </button>
                </div>
                <div className={s.column}>
                    <button onClick={() => dispatch(handleCopy({ id: deposit.id, bankId: bankId! }))} className={s.button}> + </button>
                </div>
            </div>
        </>
    )
}
