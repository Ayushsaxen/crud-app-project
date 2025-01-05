const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Must Required"]
    },
    dsg:{
        type:String,
        required:[true,"Designation Must Required"]
    },
    salary:{
        type:Number,
        required:[true,"Salary Must Required"]
    },
    email:{
        type:String,
        required:[true,"Email Must Required"]
    },
    phone:{
        type:String,
        required:[true,"Phone Must Required"]
    },
    city:{
        type:String,
        default:"Noida"
    },
    state:{
        type:String
    }
})
const Employee = new mongoose.model("Employee",EmployeeSchema)
module.exports = Employee