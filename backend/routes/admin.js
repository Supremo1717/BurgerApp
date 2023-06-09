const express = require("express")
const routes = express.Router();
//Services 
const services = require("../services/products")
const truncate = require("../services/truncate")
const {ret, ins, del, upd} = services();
routes.get("/admin", async (req, res, next)=>{
    const data = await ret()
    res.render("admin", {queries: data})
}) 
routes.delete("/truncate", async (req, res)=>{
    try {
        await truncate()
        res.status(200).json({message: "Cleared Successfully!"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Clearing Unsuccessful!"})

    }
})

routes.post("/insertProduct", async (req, res)=>{
    try {
        const {name, price, PicFileLocation} = req.body;
        await ins({name: name, price: price, picloc: PicFileLocation})  
        res.status(200).json({message: "Created Successfully!"})
  
    } catch (error) {
        console.log("There is an error: ", error)
        res.status(400).json({message: "Unable to create!"})
    }

   
})
routes.put("/updateProduct", async (req, res)=>{
    try {
        const {id, name, price, PicFileLocation} = req.body;
        await upd({id: id, name: name, price: price, PicFileLocation: PicFileLocation})
        res.status(200).json({message: "Updated Successfully!"})
    } catch (error) {
        console.log("There is an error: ", error)
        res.status(400).json({message: "Unable to update!"})
    }
 
})
routes.delete("/deleteProduct", async (req, res)=>{
    try {
         
    const {id} = req.body;
    await del(id); 
    res.status(200).json({message: "Deleted Successfully!"})
    } catch (error) {
        console.log("The error is: ", error)
        res.status(400).json({message: "Unable to Delete!"})
    }
  
    

})

module.exports = routes