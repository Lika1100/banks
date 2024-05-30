
import { TermFilters } from "./components/TermFilters";
import { useAppSelector } from "./redux/store";
import { getHonestRate } from "./domain/getHonestRate";
import { DepositsTable } from "./components/DepositsTable";
import Header from "./components/Header";
import Container from "./components/Container";



// Фильтры
// срок: от __ до __
// проценты: ✓ в конце  ✓ ежемесячно

// ✓ пенсионер
// ✓ финуслуги

// ✓ только пополняемые

// разделить на 4 отдельных файла events.ts
// написать тесты на редьюсеры


export function App() {
    const filters = useAppSelector(state => state.filters);
    const hiddenBanks = useAppSelector(state => state.preferences.hiddenBanks);
    const hiddenDeposits = useAppSelector(state => state.preferences.hiddenDeposits);

    const depositsStore = useAppSelector(state => state.deposits)
    const deposits = Object.values(depositsStore)
        .flatMap(({ current }) => {
            return current.map((deposit) => {
                return {
                    ...deposit,
                    honestRate: getHonestRate(deposit.rate, deposit.term)
                }
            })
        })
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
            if (!hiddenBanks.includes(deposit.bankId!)) {
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
        <Container>
            <Header />
            <TermFilters />
            <DepositsTable deposits={deposits} />
        </Container>
    );
}
