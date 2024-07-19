 const notFound = (req,res) =>
{
    res.status(404).send("You have entered the wrong route 😒");
}

export default notFound; 
