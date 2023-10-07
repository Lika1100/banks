export function getHonestRate(endRate: number, days: number): number {
    const years = days / 365

    const totalIncome = 1 + endRate / 100 * days / 365;
    const daysInMonth = 365 / 12;
    const months = days / daysInMonth;

    const monthRate = totalIncome ** (1 / months) - 1;

    return monthRate * 12;

    let pk = (((1 + endRate / 100 / 12) ** (years * 12)) - 1) / years * 100
    return pk
}

// pk = ((1 + p12/12)^(days*12) - 1)/days