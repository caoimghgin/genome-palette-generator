interface Budget {
    category: string,
    budgeted: number,
    spent: number,
}

export interface SwatchModel {
    category: string,
    budgeted: number,
    spent: number,
}

export interface SwatchData {
    budgets: SwatchModel[];
}

export default Budget;