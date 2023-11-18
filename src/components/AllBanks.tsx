import React from 'react';
import { banks } from '../types/banks';
import { useNavigate } from 'react-router-dom';
import s from "../App.module.css";
import { useAppDispatch } from '../redux/store';

export function AllBanks() {
    const navigate = useNavigate();
    function handleClick(bankId: string) {
        navigate(`/edit/${bankId}`)
    }
  return (
    <ul>
      {banks.map(({name, logo, id}) => {
        return (
          <li>
            <img className={s.bankLogo} src={logo} /> {name}
              <button onClick={() => handleClick(id)}>
                click
              </button>
          </li>
        )
      })}
    </ul>
  )
}
