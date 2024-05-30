import React from 'react';
import { banks } from '../types/banks';
import { useNavigate } from 'react-router-dom';
import s from "./AllBanks.module.css";
import Header from './Header';
import Container from './Container';

export function AllBanks() {
    const navigate = useNavigate();
    function handleClick(bankId: string) {
        navigate(`/edit/${bankId}`)
    }
  return (
    <Container>
      <Header />
      {banks.map(({name, logo, id}) => {
        return (
          <div className={s.banks}>
            <img className={s.bankLogo} src={logo} />
            <p className={s.text}>{name}</p> 
              <button onClick={() => handleClick(id)} className={s.button}>
                Добавить вклад
              </button>
          </div>
        )
      })}
    </Container>
  )
}
