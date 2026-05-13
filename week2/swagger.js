import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title : "Contacts",
        description: "Contacts for CSE341 API"
    },
    host: "cse341-projects-cs73.onrender.com/",
    schemas: ["http,","https"]
}

const outFile= "./swagger.json"
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outFile,endpointsFiles,doc)