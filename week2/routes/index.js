import express from 'express'
import contactRoutes from './contacts.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with {type:"json"};

const routes = express.Router();

routes.use('/api-docs',swaggerUi.serve)
routes.get('/api-docs',swaggerUi.setup(swaggerDocument))

routes.use("/contacts",contactRoutes)

export default routes