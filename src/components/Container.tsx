import React from 'react';
import s from "./Container.module.css";

type ContainerType = {
    children: React.ReactNode
}

export default function  Container({children}: ContainerType) {
  return (
    <div className={s.wrapper}>
        {children}
    </div>
  )
}
