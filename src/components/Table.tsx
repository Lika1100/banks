import s from "../App.module.css"
import { useAppDispatch } from "../redux/store";
import { setSort } from "../redux/sortSlice";

export interface Column<T> {
    title: string,
    render: (obj: T) => React.ReactNode,
    sortKey?: SpecificTypeKeys<T, number>,
}

export type SpecificTypeKeys<T, U> = keyof {
    [k in keyof T as T[k] extends U ? k : never]: ''
}

interface TableProps<T> {
    data: T[],
    columns: Column<T>[],
    sortKey?: SpecificTypeKeys<T, number>,
    sortDir?: 'asc' | 'desc',
    onSortKeyChange?: (key: SpecificTypeKeys<T, number>) => void,
}


export function Table<T>({ data, columns, onSortKeyChange }: TableProps<T>) {
    // сделать ссылками всё что что ссылки
    // сделать всем bankId
    // у выбранной колонки стрелочка в правильном направлении

    return (
        <table className={s.depositsList}>
            <tr className={s.deposit}>
                {columns.map(({ title, sortKey }) => {
                    if (sortKey !== undefined) {
                        return (
                            <th>
                                {title} <button onClick={() => onSortKeyChange?.(sortKey)}>↓</button>
                            </th>
                        )
                    }
                    return (
                        <th>
                            {title}
                        </th>
                    )
                })}
            </tr>
            <>
                {data.map((deposit) => {
                    return (
                        <tr className={s.deposit}>
                            {columns.map(({render}) => <td>{render(deposit)}</td>)}
                        </tr>
                    )
                })}
            </>
            <a href={`/blacklist`}>перейти в черный список</a>
        </table>
    )
}
