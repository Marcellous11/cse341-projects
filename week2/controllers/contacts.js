import { getDB } from "../data/db.js";
import { ObjectId } from "mongodb";

async function GetContactById(req, res, next) {
  // swagger.tags=['Contacts']
  try {
    let db = await getDB();
    let contacts = db.collection("Contacts");

    let user_id = req.params.id;

    const query = { _id: new ObjectId(user_id) };
    const user = await contacts.findOne(query);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function GetAllContacts(req, res, next) {
    // swagger.tags=['Contacts']
  try {
    let db = await getDB();
    let contacts = db.collection("Contacts");

    const allContacts = await contacts.find().toArray();
    res.json(allContacts);
  } catch (err) {
    next(err);
  }
}

async function CreateContact(req,res,next){
    // swagger.tags=['Contacts']
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday:req.body.birthday
      }

    let db = await getDB();
    let contacts_collection = db.collection("Contacts");
    
    const respone = await contacts_collection.insertOne(user)

    if(respone.acknowledged){
      res.status(201).send()
    }else{
      res.status(500).json(Response.error || "Some error occured while creating user")
    }

  } catch (err) {
    next(err);
  }
}
async function UpdateContact(req,res,next){
    // swagger.tags=['Contacts']
  const userId = new ObjectId(req.params.id)
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday:req.body.birthday
      }

    let db = await getDB();
    let contacts_collection = db.collection("Contacts");
    
    const respone = await contacts_collection.replaceOne({_id:userId},user)

    if(respone.modifiedCount > 0 ){
      res.status(204).send()
    }else{
      res.status(500).json(Response.error || "Some error occured while creating user")
    }
    
  } catch (err) {
    next(err);
  }
}
async function DeleteContact(req,res,next){
    // swagger.tags=['Contacts']
  const userId = new ObjectId(req.params.id)
    try {

    let db = await getDB();
    let contacts_collection = db.collection("Contacts");
    
    const respone = await contacts_collection.deleteOne({_id:userId},true)

    if(respone.deletedCount > 0 ){
      res.status(204).send()
    }else{
      res.status(500).json(Response.error || "Some error occured while creating user")
    }

  } catch (err) {
    next(err);
  }
}

export {
  GetAllContacts,
  GetContactById,
  CreateContact,
  UpdateContact,
  DeleteContact,
};
