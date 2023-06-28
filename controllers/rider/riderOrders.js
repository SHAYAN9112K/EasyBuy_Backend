const ordersModel = require("../../models/order")
const userModel = require("../../models/user")
const productModel = require("../../models/product")
const categoryModel = require("../../models/category")

module.exports.getRiderOrders = async (req, res) => {
    console.log("hitttted")
    try{

        // Search through title names
        var {search} = req.query
        if(!search) search = ""

        const products = await ordersModel.find({"riderEmail": {$eq:req.params.riderEmail}})

        return res.json({
            success : true,
            status : 200,
            message : "list of products",
            data : products
        })

    }catch(error){
        return res.json({
            success : false,
            status : 400,
            message : error.message
        })
    }
}



module.exports.setRiderEmail = async (req, res) => {
    try{

        
        // var {search} = req.query
        // if(!search) search = ""

        const {id} = req.query;

    
        const updatedorders= await ordersModel.findOneAndUpdate({_id : id}, req.body, {new :true})

        return res.json({
            success : true,
            status : 200,
            message : "list of products",
            data : updatedorders
        })

    }catch(error){
        return res.json({
            success : false,
            status : 400,
            message : error.message
        })
    }
}



