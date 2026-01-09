const mongoose = require('mongoose');
require("dotenv").config();

main().then(()=>{
    console.log("connection success for mongodb");
}).catch((err)=>{
    console.log("something wrong is happening ");

})

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema= new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
         required:true,
        unique:true
    },
    password:{
        type:String,
         required:true,
    
    },
     createdAt: {
         type: Date,
          default: Date.now
         }
})
module.exports= mongoose.model("User",userSchema);