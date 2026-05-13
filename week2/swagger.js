import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title : "Contacts",
        description: "Contacts for CSE341 API"
    },
    host: "cse341-projects-cs73.onrender.com",
    schemes: ["https"]
}

const outFile= "./swagger.json"
const endpointsFiles = ['./routes/index.js','routes/contacts.js']

swaggerAutogen()(outFile,endpointsFiles,doc)