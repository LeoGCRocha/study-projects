import mongoose from "mongoose"

const Schema = mongoose.Schema

const ProductSchema = new Schema(
{
    price: {
        type: Number,
    },
    expense: {
        type: Number,
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        }   
    ]
},
{ toJSON: { getters: true }, timestamps: true })

const Product = mongoose.model("Product", ProductSchema)

export default Product