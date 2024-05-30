import React from 'react'
import { Link } from 'react-router-dom';
import s from './Header.module.css';

export default function Header() {
  return (
    <nav className={s.header}>
        <ul className={s.header__logo}>
          <Link to='/'/>
        </ul>
        <ul>
            <Link className={s.header__link} to='/'>
              Мои депозиты
            </Link>
        </ul>
        <ul>
            <Link className={s.header__link} to='/blacklist'>
              Черный список
            </Link>
        </ul>
        <ul>
            <Link className={s.header__link} to='/banks'>
              Список всех банков
            </Link>
        </ul>
    </nav>
  )
}
