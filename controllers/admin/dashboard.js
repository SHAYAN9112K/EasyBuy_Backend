const orderModel = require("../../models/order")
const userModel = require("../../models/user")
const productModel = require("../../models/product")
const categoryModel = require("../../models/category")

module.exports.dashboardData = async (req, res) => {

    try{

        // counts 
        const sellersCount = await userModel.find({"userType":"SELLER"}).count()
        const usersCount = await userModel.find({"userType":"USER"}).count()
        const ridersCount = await userModel.find({"userType":"RIDER"}).count()
        const categoriesCount = await categoryModel.find().count()

        return res.json({
            success : true,
            message : "dashboard data",
            data : {
                sellersCount,
                usersCount,
                ridersCount,
                categoriesCount
            }
        })

    }catch(error){
        res.send(error.message)
    }

}

module.exports.getAllUsers = async (req, res) => {

    try{

        // all users
        const users = await userModel.find({"userType":"USER"})
            .select("-password -token")

        return res.json({
            success : true,
            message : "all users",
            data : users
        })

    }catch(error){
        res.send(error.message)
    }

}


module.exports.getAllSellers = async (req, res) => {

    try{

        // all users
        const users = await userModel.find({"userType":"SELLER"})
            .select("-password -token")

        return res.json({
            success : true,
            message : "all Riders",
            data : users
        })

    }catch(error){
        res.send(error.message)
    }

}

module.exports.getAllRider = async (req, res) => {

    try{

        // all users
        const users = await userModel.find({"userType":"RIDER"})
            .select("-password -token")

        return res.json({
            success : true,
            message : "all Riders",
            data : users
        })

    }catch(error){
        res.send(error.message)
    }

}


module.exports.deletePerson = async (req, res) => {
    try{

        const {id} = req.query;
        
        // check if product exist with the given product id
        const product = await userModel.deleteOne({_id : id})
        if(!product){
            return res.json({
                success : false,
                message : "Does not exist",
            })
        }
        return res.json({
            success : true,
            message : "Deleted successfully",
        })

    }catch(error){
        return res.send(error.message)
    } 
}
