import { getDB } from "../models/db.js";

 async function GetContactByFirstName(req, res, next) {
  try {
    let db = await getDB();
    let contacts = db.collection("Contacts");

    let firstName =req.query.firstName

    const query = { firstName: firstName };
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

export {GetAllContacts, GetContactByFirstName}