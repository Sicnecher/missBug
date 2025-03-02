import { MongoClient } from "mongodb";

export const dbService = {
    getCollection
}

const url = "mongodb://localhost:27017";

const dbName = "oct24_db";
var dbConn = null;

async function getCollection(collectionName) {
  const db = await _connect();
  return db.collection(collectionName);
}

async function _connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(url);
    dbConn = client.db(dbName);
    return dbConn;
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}