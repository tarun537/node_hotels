const mongoose = require("mongoose");
require('dotenv').config();

const MONGO_URL =process.env.MONGO_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const db = mongoose.connection;
db.on('disconnected', ()=>{
    console.log("disconnected to db")
})
db.on('error', ()=>{
    console.log("error to db")
})

module.exports = db;