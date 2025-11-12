const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_URI || "mongodb+srv://Rockingrudra786_db_user:ZCw99HdjPRmASgoC@cluster0.bz26e3c.mongodb.net/BiteAndGomern?appName=Cluster0";

let isConnected = false;

module.exports = async function (callback) {
  try {
    // Only connect once
    if (!isConnected && mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      });
      isConnected = true;
      console.log("✓ Connected to MongoDB");
    }

    const db = mongoose.connection.db;
    const foodCollection = db.collection("food_items");
    const categoryCollection = db.collection("foodCategory");

    const data = await foodCollection.find({}).toArray();
    const Catdata = await categoryCollection.find({}).toArray();

    callback(null, data, Catdata);
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    callback(err, null, null);
  }
};