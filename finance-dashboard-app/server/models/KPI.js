import mongoose from "mongoose"

const Schema = mongoose.Schema

const daySchema = new Schema(
{
    date: String,
    revenue:  {
        type: Number,
        get: (value) => value / 100
    },
    expenses:  {
        type: Number,
        get: (value) => value / 100
    },
    operationalExpenses: {
        type: Number,
        get: (value) => value / 100
    }
},
{ toJSON: { getters: true } })

const monthSchema = new Schema(
{
    month: String,
    revenue:  {
        type: Number,
    },
    expenses:  {
        type: Number,
    },
    operationalExpenses: {
        type: Number,
    },
    nonOperationalExpenses: {
        type: Number,
    },
},
{ toJSON: { getters: true } })

const KPISchema = new Schema(
{
    totalProfit: {
        type: Number,
    },
    totalRevenues: {
        type: Number,
    },
    totalExpenses: {
        type: Number,
    },
    expensesByCategory: {
        type: Map,
        of: {
            type: Number,
        }
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema]
},
{ toJSON: { getters: true }, timestamps: true })

const KPI = mongoose.model("KPI", KPISchema)

export default KPI