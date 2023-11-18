import { Form } from './Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Deposit } from '../types/types';
import { addNewForm, handleChangeState } from '../redux/depositsSlice';
import { saveEvent } from '../api/getEventsSlice';


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
    console.log(deposits, "???") // f34  484
    return (
        <>
            <h1>{bankId}</h1>
            <button onClick={() => dispatch(addNewForm(bankId!))}>Добавить</button>
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
                <button onClick={() => handleSaveDraft(bankId!, deposits)}>Save</button>
            </table>
        </>
    )
}

//отдельный компонент edit deposit
// добавлять и сохранять изменения 

