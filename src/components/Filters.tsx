import React, { useState } from 'react'
import { RetireeFilter } from './RetireeFilter'
import { FUFilter } from './FUFilter'
import { InterestFilter } from './InterestFilter'
import { ReplenishableFilter } from './ReplenishableFilter';
import s from "./Filters.module.css"
import IconFilter from './IconFilter';
import cn from "classnames";
import IconClose from './IconClose';

export default function Filters() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button className={s.filter__button} onClick={() => setIsOpen(true)}>
                <IconFilter />
                Фильтры
            </button>
            <div className={cn(s.module, { [s.module__open]: isOpen })}>
                <div className={s.module__block}>
                    <div className={cn(s.checkbox__filter)}>
                        <IconClose className={s.close} onClick={() => setIsOpen(false)}/>
                        <RetireeFilter />
                        <FUFilter />
                        <ReplenishableFilter />
                    </div>
                    <InterestFilter />
                </div>
            </div>
        </>
    )
}
