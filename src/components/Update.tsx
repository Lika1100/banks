import React, { useState } from 'react'
import { Form } from './Form';
import { useParams } from 'react-router-dom';
import { handleCopy, handleRemove, handleUpdate } from '../redux/depositsSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Deposit } from '../types/types';


export function Update() {
    const { bankId } = useParams();
    const deposits = useAppSelector(state => state.deposits[bankId!].draft)
    const dispatch = useAppDispatch();
    //const [deposits, setDeposits] = useState(mkbEvent.deposits)
    
    function handleUpdateForm<T extends keyof Deposit>(id: number, key: T, value: Deposit[T]) {
        dispatch(handleUpdate({
            id: id,
            bankId: bankId!,
            depositUpdate: { [key]: value },
        }))
        // setDeposits((prev) => {
        //     let obj = {...prev[i]}
        //     obj[key] = value
        //     return prev.with(i, obj);
        // })
    }
    // function handleCopy(i: number) {
    //     setDeposits((prev) => [...prev, prev[i]])
    // }
    // function handleRemove(i: number) {
    //     setDeposits(prev => prev.toSpliced(i, 1))
    // }

    return (
        <>
            <h1>{bankId}</h1>
            <div style={{ display: "flex" }}>
                {deposits.map((deposit, i) => {
                    return (
                        <>
                            <Form
                                onValueChange={(key, value) => handleUpdateForm(i, key, value)}
                                deposit={deposit}
                                key={i}
                            />
                            <button onClick={() => dispatch(handleCopy({id: i, bankId: bankId!}))} style={{ height: "50%" }}> + </button>
                            <button onClick={() => dispatch(handleRemove({id: i, bankId: bankId!}))} style={{ height: "50%" }}> - </button>
                        </>
                    )
                })}
                <button>Save</button>
            </div>
        </>
    )
}

//отдельный компонент edit deposit
// добавлять и сохранять изменения 

