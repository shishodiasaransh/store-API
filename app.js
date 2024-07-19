import express from "express";
import 'dotenv/config';
import dbConnect from "./dbConnect.js";
import notFound from "./middleware/notFound.js"
import productRoutes from "./routes/productRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
import "express-async-errors"

const app = express();

const PORT = process.env.PORT || 6003;
app.use(express.json());

 app.get("/",(req,res) => {
     res.send("<h1>Store-API</h1>")
 })
app.use ("/products",productRoutes);
app.use(notFound);
app.use(errorHandler);

const start = async() =>{
    try {
        await dbConnect(process.env.MONGO_URL);
        console.log("Database Connected...")
        app.listen(PORT,console.log("Server Started..."))
    } catch (error) {
        console.log(error);
    }
}

start();