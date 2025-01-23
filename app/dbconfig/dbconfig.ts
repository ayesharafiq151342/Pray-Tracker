import mongoose from "mongoose";
export async function connect(){
try {
    mongoose.connect(process.env.mongo_url !)
   const connection = mongoose.connection
   connection.on('connected' ,()=>{
    console.log(connect);
    
   })
} catch (error) {
    console.log("erre",error);
    
}
}