
import { TermFilters } from "./components/TermFilters";
//import { TableDeposits } from "./components/DepositsTable";
import { RetireeFilter } from "./components/RetireeFilter";
import { FUFilter } from "./components/FUFilter";
import { ReplenishableFilter } from "./components/ReplenishableFilter";
import { InterestFilter } from "./components/InterestFilter";
import store, { useAppSelector, useAppDispatch} from "./redux/store";
import { getHonestRate } from "./domain/getHonestRate";
import { Table } from "./components/Table";
import { DepositsTable } from "./components/DepositsTable";



// Фильтры
// срок: от __ до __
// проценты: ✓ в конце  ✓ ежемесячно

// ✓ пенсионер
// ✓ финуслуги

// ✓ только пополняемые


export function App() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filters);
    const hiddenBanks = useAppSelector(state => state.preferences.hiddenBanks);
    const hiddenDeposits = useAppSelector(state => state.preferences.hiddenDeposits);

    const depositsStore = useAppSelector(state => state.deposits)
    const deposits = Object.entries(depositsStore)
        .flatMap(([bankId, { current }]) => current.map(deposit => ({
            ...deposit,
            bankId,
            honestRate: getHonestRate(deposit.rate, deposit.term)
        })))
        .filter((deposit) => deposit.term >= filters.minTerm && deposit.term <= filters.maxTerm)
        .filter((deposit) => {
            return filters.retiree || !deposit.retiree
        })
        .filter((deposit) => filters.finuslugi || !deposit.finuslugi)
        .filter((deposit) => filters.replenishable ? deposit.replenishment > 0 : deposit)
        .filter((deposit) => {
            if (filters.interest === "all") {
                return deposit
            } else if (filters.interest === "monthly") {
                return deposit.interest === "monthly"
            } else if (filters.interest === "end") {
                return deposit.interest === "end"
            }
        })
        .filter((deposit) => {
            if (hiddenBanks.length === 0) {
                return true
            }
            if (!hiddenBanks.includes(deposit.bankId)) {
                return deposit
            }
        })
        .filter((deposit) => {
            if (hiddenDeposits.length === 0) {
                return true
            }
            if (!hiddenDeposits.includes(deposit.id)) {
                return deposit
            }
        })

    return (
        <div>
            <TermFilters />
            <RetireeFilter />
            <FUFilter />
            <InterestFilter />
            <ReplenishableFilter />
            <DepositsTable deposits={deposits}/>
            {/* <Table deposits={deposits} dispatch={dispatch}/> */}
        </div>
    );
}
