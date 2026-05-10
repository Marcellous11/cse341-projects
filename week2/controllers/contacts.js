import { getDB } from "../models/db.js";
import {ObjectId} from 'mongodb'

 async function GetContactById(req, res, next) {
  try {
    let db = await getDB();
    let contacts = db.collection("Contacts");

    let user_id =req.params.id
    console.log(user_id)

    const query = { _id: new ObjectId(user_id) };
    const user = await contacts.findOne(query);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

 async function GetAllContacts(req, res, next)  {
  try {
    let db = await getDB();
    let contacts = db.collection("Contacts");

    const allContacts = await contacts.find().toArray();
    res.json(allContacts);
  } catch (err) {
    next(err);
  }
};

export {GetAllContacts, GetContactById}