import React, { useState } from 'react'
import { Form } from './Form';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Deposit } from '../types/types';


export function Update() {
    const { bankId } = useParams();
    const deposits = useAppSelector(state => state.deposits[bankId!].draft)
    const dispatch = useAppDispatch();
    console.log(deposits, ">>>")
    return (
        <>
            <h1>{bankId}</h1>
            <table style={{
                borderCollapse: "separate",
                borderSpacing: "0 10px",
            }}>
                {deposits.map((deposit, i) => {
                    return (
                        <Form
                            deposit={deposit}
                            key={i}
                            bankId={bankId!}
                        />
                    )
                })}
                <button>Save</button>
            </table>
        </>
    )
}

//отдельный компонент edit deposit
// добавлять и сохранять изменения 

