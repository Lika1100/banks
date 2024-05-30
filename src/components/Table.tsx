import s from "../App.module.css";
import "./Table.css";
import cn from "classnames";

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


export function Table<T>({ data, columns, onSortKeyChange, sortDir, sortKey }: TableProps<T>) {
    const sortKeyIn = sortKey
    return (
        <table className={s.depositsList}>
            <tr className={s.deposit}>
                {columns.map(({ title, sortKey }) => {
                    if (sortKey !== undefined) {
                        return (
                            <th>
                                <button 
                                  onClick={() => onSortKeyChange?.(sortKey)}
                                  className={cn({
                                    "columnTitle": true,
                                    "arrowUp": sortDir === "asc",
                                    "arrowDown": sortDir === "desc",
                                    "chosenColumn": sortKey === sortKeyIn
                                  })}>
                                  {title} 
                                </button>
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
        </table>
    )
}
