import mongoose from "mongoose";

const schema = mongoose.Schema;

const user = new schema({
    title : {type: String},
    description : {type: String},
    price : {type: String},
    image : {data: Buffer, contentType: String },
})

const userschema = mongoose.model("User", user);

export default userschema