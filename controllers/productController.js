import { Product } from "../productModel.js";

export const getAllProduct = async (req, res) => {
  console.log(req.query);
  const {featured,rating,company,name,sort,fields,limit,numericFilters}=req.query;
  const myQuery={};
  if(featured)
  {
      myQuery.featured=featured==="true";
  }
  if(company){
    myQuery.company=company;

  }
  //if(rating){
    //myQuery.rating=rating;
  //}
  if (name)
  {
    myQuery.name={$regex:name,$options:"i"};
  }
  let result= Product.find(myQuery);
  if (sort)
    {
      let sortByfields = sort.split(",");
        sortByfields = sortByfields.map((field)=>
        {
            return field.trim(); //remove blank spaces
        });
        sortByfields=sortByfields.join(" "); //converted into string seperated by space
        result =result.sort(sortByfields);
    }
  else 
  {
    result =  result.sort("createdAt");
  }
  if (fields)
  {
     let selectedFields=fields.split(",");
     selectedFields - selectedFields.map((field)=>field.trim());
     selectedFields= selectedFields.join(" ");
     result=result.select(selectedFields);
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limitValue = Number(req.query.limit) || 10;
  const skipValue=(page-1)*limitValue
  result =result.skip(skipValue).limit(limitValue);
  if (numericFilters)
  {
    const operatorMap={
        '>':'$gt',
        '<':'$lt',
        '>=':'$gte',
        '<=':'$lte',
        '=':'$eq'
    }
    const regEx="/\b(<|<=|>|>=|=)\b"
    let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    console.log(filters);
    const options=["price","rating"]
    filters=filters.split(',').forEach((item)=>{
        const [field,operator,value]=item.split('-')
        if (options.includes(field)){
            myQuery[field]={...myQuery[field],[operator]:Number(value)}
        }
    })
  }
  console.log(myQuery);
  const products=await result;
  res.status(200).json({ nbHits: products.length, products });
};


export const getAllProductTest = async(req, res) => {
   //const products = await Product.find({featured:true});
  //  const products = await Product.find({name:"vase table"});
  const products = await Product.find().select("name price");;

  res.status(200).json({ nbHits: products.length, products });
  

};