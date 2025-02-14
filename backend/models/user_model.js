
const mongoose=require('mongoose');

const loginSchema =new mongoose.Schema({
    loginTime:{type:Date,required:true},
    logoutTime:Date,
    duration :{type:Number,default:0}
})

const userSchema= new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true, 
      },
    contact:{
        type: Number,
        required: false,
      },    
    isAdmin: {
        type: Boolean,
        default: false, 
      },
      
    password:{
        type: String,
        required: true,
      },
    card:{
       type: [Object],
        default:[]
    },
    order:{
        type: [Object],
        default:[]
    },
    loginHistory:[loginSchema],
    totalTimeSpent: { type: Number, default: 0 ,description: "Total time spent in minutes"}

},{ timestamps: true });

module.exports = mongoose.model("user",userSchema)