import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
})

const Users = mongoose.model('User', userSchema)
export default Users