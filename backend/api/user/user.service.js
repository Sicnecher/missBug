import { dbService } from "../../data/db.service.js";

export const userService = {
  getByUsername,
  save
};

async function getByUsername(username) {
  const collection = await dbService.getCollection("user");
  try {
    return await collection.findOne({ username });
  } catch (err) {
    console.log(`Error while finding user ${username}`, err);
    throw err;
  }
}


async function save(userData){
    const collection = await dbService.getCollection("user");
    try{
        const savedUser = collection.insertOne(userData);
        console.log("User saved successfully");
        return savedUser;
    }catch(error){
        console.log("Error while saving user", error);
        throw error;
    }
}