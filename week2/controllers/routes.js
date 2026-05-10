import express from 'express'
import {GetContactById,GetAllContacts} from './contacts.js'

const routes = express.Router();

routes.get("/all_contacts",GetAllContacts)
routes.get("/contact/:id",GetContactById)


export {routes}