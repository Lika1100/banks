import { Form } from './Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Deposit } from '../types/types';
import { addNewForm, handleChangeState } from '../redux/depositsSlice';
import { saveEvent } from '../api/getEventsSlice';
import s from "./Update.module.css";
import Header from './Header';
import Container from './Container';


export function Update() {
    const { bankId } = useParams();
    const deposits = useAppSelector(state => state.deposits[bankId!]?.draft ?? [])
    const dispatch = useAppDispatch();
     
    const navigate = useNavigate();

    function handleSaveDraft(bankId: string, draft: Deposit[]) {
        saveEvent(bankId, draft).then(() => {
            dispatch(handleChangeState(bankId))
        })
        navigate(`/`)
    }

    return (
        <Container>
            <Header />
            <h1>Bank ID: {bankId}</h1>
            <button
              className={s.button} 
              onClick={() => dispatch(addNewForm(bankId!))}>
                Добавить
            </button>
            <>
                {deposits.map((deposit, i) => {
                    return (
                        <Form
                            deposit={deposit}
                            key={i}
                            bankId={bankId!}
                        />
                    )
                })}
                <button
                  className={s.button}  
                  onClick={() => handleSaveDraft(bankId!, deposits)}>
                    Save
                </button>
            </>
        </Container>
    )
}

//отдельный компонент edit deposit
// добавлять и сохранять изменения 

