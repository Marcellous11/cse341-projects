import express from 'express'
import {GetContactById,GetAllContacts} from '../controllers/contacts.js'
import contactRoutes from './contacts.js'

const routes = express.Router();

routes.use("/contacts",contactRoutes)

export default routes