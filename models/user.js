import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 }
})

export default mongoose.model('Users', userSchema)