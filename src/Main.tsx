import React from 'react'
import Header from './components/Header'
import { TermFilters } from './components/TermFilters'
import { DepositsTable } from './components/DepositsTable'
import { useAppSelector } from './redux/store';
import { getHonestRate } from './domain/getHonestRate';

export default function Main() {
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
        <div>
            <Header />
            <TermFilters />
            <DepositsTable deposits={deposits} />
        </div>
    )
}
