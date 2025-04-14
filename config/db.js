import mongoose from "mongoose";
import 'dotenv/config';

export const  connectDB = async () =>{
    const db=process.env.DBURL

    await mongoose.connect(db).then(()=>console.log("DB Connected")).catch((err)=>{console.log(err)});
   
}
