import express from 'express'
import {GetContactByFirstName,GetAllContacts} from './contacts.js'

const routes = express.Router();

routes.get("/all_contacts",GetAllContacts)
routes.get("/contact",GetContactByFirstName)


export {routes}