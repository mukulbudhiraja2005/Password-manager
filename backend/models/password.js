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

const passwordSchema=new mongoose.Schema({
         owner: {
                 type: mongoose.Schema.Types.ObjectId,
                    ref: 'User', required: false 
                },
    site:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Password", passwordSchema);