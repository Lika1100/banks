import { DepositsState } from "../redux/depositsSlice";

export function extractActualBlacklistDeposits(
  hiddenDepositsIds: string[],
  depositsState: DepositsState,
  hiddenBanksIds: string[]
) {
    return Object.entries(depositsState)
      .filter((x) => !hiddenBanksIds.includes(x[0]))
      .flatMap((x) => {
        const currentDeposits = x[1].current
        const bankId = x[0]
        return currentDeposits
          .filter(({id}) => hiddenDepositsIds.includes(id))
          .flatMap((a) => {
            return {...a, bankId}
          })
      })
    
}