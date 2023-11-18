// @ts-ignore
import { Table } from "./Table";
import { Deposit } from "../types/types";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { depositsTableColumns } from './DepositsTableColumns';
import { setSort } from "../redux/sortSlice";
import { HonestDepositSortKey } from "../redux/sortSlice";


export interface HonestDeposit extends Deposit {
  bankId: string,
  honestRate: number
}

interface DepositsTableProps {
  deposits: HonestDeposit[]
}

export function DepositsTable({deposits}: DepositsTableProps) {
    
  // сдлеать фильтры и сделать сортировку (sortSlice)
    const dispatch = useAppDispatch() 
    const sorted = useAppSelector(state => state.sorted)
    
    const depositsSorted = [...deposits]
      .sort((a, b) => (a[sorted.key] - b[sorted.key]) * sorted.desc);
    function handleSorted(key:  HonestDepositSortKey) {
      dispatch(setSort(key))
    }
    return (
        <Table
          onSortKeyChange={handleSorted}
          data={depositsSorted}
          columns={depositsTableColumns}
          sortKey={sorted.key}
          sortDir={sorted.desc > 0 ? "asc" : "desc"}
        />
    )
}
