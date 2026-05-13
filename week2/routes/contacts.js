import express from "express";
import {
  GetContactById,
  GetAllContacts,
  CreateContact,
  UpdateContact,
  DeleteContact,
} from "../controllers/contacts.js";

const routes = express.Router();

routes.get("/", GetAllContacts);
routes.get("/:id", GetContactById);
routes.post("/", CreateContact);
routes.put("/:id", UpdateContact);
routes.delete("/:id", DeleteContact);

export default routes;
