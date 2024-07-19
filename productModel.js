import mongoose from "mongoose";

const productSchema=mongoose.Schema (
    {
        name:{
            type:String,
            trim:true,
            required:[true,"please Enter the name of product "]
        },
        price:{
            type:Number,
            required:[true,"please Enter the name of product "]

        },
        company:{
            type:String,
            enum:{
                values:['ikea','nilkamal','pepperfry','durian'],
                message:'{VALUE} not supported as company name'
            }
        },
        rating:{
            type:Number,
            default:4.5
        },
        featured:{
            type:Boolean,
            default:false

        },
        createdAt:{
             type:Date,
             default:Date.now(),
        },
    }
);

export const Product = mongoose.model("Product",productSchema);