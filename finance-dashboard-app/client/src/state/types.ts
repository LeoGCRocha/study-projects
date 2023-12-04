export interface ExpensesByCategory {
    salaries: number
    suplies: number
    services: number
}

export interface Month {
    id: string
    month: string

    revenue: number
    expenses: number
    nonOperationalExpenses: number
    operationalExpenses: number
}

export interface Day {
    id: string
    date: string   
    revenue: number
    expenses: number
}

export interface GetKpisResponse {
    id: string
    _id: string
    __v: number
    
    totalProfit: number
    totalRevenue: number
    totalExpenses: number
    expensesByCategory: ExpensesByCategory
    monthlyData: Array<Month>
    dailyData: Array<Day>
}

export interface GetProductsResponse {
    id: string
    _v: string
    _id: string
    price: number
    expense: number
    transactions: Array<string>
    createdAt: string
    updatedAt: string
}