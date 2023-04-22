const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error',()=>{
  console.log('MongoDB connet error!')
})

db.once("open", () => {
  console.log("MongoDB connet success!");
});

module.exports = db