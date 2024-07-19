import dbConnect from "./dbConnect.js"
import "dotenv/config"
import {Product} from "./productModel.js"
import productData from "./products.json" assert { type:"json"};




;
(async()=>
{
    try {
        await dbConnect(process.env.MONGO_URL);
        console.log("database connected successfully 👍");
        Product.deleteMany()
        console.log ("all records deleted");
        await Product.create(productData);
        console.log("all Records are inserted");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
