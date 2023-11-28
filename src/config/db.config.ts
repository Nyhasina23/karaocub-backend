import mongoose from "mongoose";

const DB_CON_STRING = process.env.DB_CON_STRING || "mongodb://localhost:27017/karaocub"

function init() {
    mongoose.set("strictQuery", false).connect(DB_CON_STRING).then(() => console.log("🥭  Database connected : " + DB_CON_STRING)).catch(() => "MongoDB connection Error")
}

init()