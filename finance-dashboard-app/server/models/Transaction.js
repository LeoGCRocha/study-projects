import mongoose from "mongoose"

const Schema = mongoose.Schema

const TransactionSchema = new Schema(
{
    buyer: {
        type: String,
    },
    amount: {
        type: Number,
    },
    productsIds: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
},
{ toJSON: { getters: true }, timestamps: true })

const Transaction = mongoose.model("Transaction", TransactionSchema)

export default Transaction