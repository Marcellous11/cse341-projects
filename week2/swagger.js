import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title : "Contacts",
        description: "Contacts for CSE341 API"
    },
    host: "localhost:8080",
    schemas: ["https,","http"]
}

const outFile= "./swagger.json"
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outFile,endpointsFiles,doc)