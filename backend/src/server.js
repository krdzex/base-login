import config from "./config/config";
import app from "./express";
import mongoose from "mongoose"

mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("Error connecting to mongoDB"))

app.listen(config.port, (err) => {
    if (err) console.log(err)
    console.info("Server started on port: ", config.port)
})