import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    username: String,
    date: String,
    title: String,
    price: Number,
    image: String
});

export default mongoose.model('CartItem', cartItemSchema);