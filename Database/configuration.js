
const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).catch((err) => {
    console.log(err)
}).then(() => {
    console.log(`Mongodb sessessfully connexted at ${MONGO_URI}`)

});
