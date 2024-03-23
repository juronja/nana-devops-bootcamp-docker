import express from "express"
const app = express()
const port = 3000

// Destructured import of custom functions
import { isEmptyObject, isInvalidEmail } from './validator.js' // ./ tells that the validator is in root not in node_modules

// MongoDB
import { MongoClient } from "mongodb"

// Database Name
const dbName = 'user-account'

const { MONGO_ADMIN_USER, MONGO_ADMIN_PASS } = process.env // Import user and pass from SYSTEM environments
// add SYSTEM variables with "export MONGO_ADMIN_USER=username" OR in docker compose environment

// use when starting application locally with node command
let mongoUrlLocal = `mongodb://${MONGO_ADMIN_USER}:${MONGO_ADMIN_PASS}@localhost:27017`

// use when starting application as a separate docker container
let mongoUrlDocker = `mongodb://${MONGO_ADMIN_USER}:${MONGO_ADMIN_PASS}@host.docker.internal:27017`;

// use container name when starting application as docker container, part of docker-compose
let mongoUrlDockerCompose = `mongodb://${MONGO_ADMIN_USER}:${MONGO_ADMIN_PASS}@mongo`;

const client = new MongoClient(mongoUrlDockerCompose)

const server = app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
}) // define listnening port

app.use(express.json()) // needed to parse the JSON to JS first.
app.use(express.static('dist')) // serves the index.html file on load
//app.use('/', express.static(__dirname + '/dist')); 


// GET method
app.get('/get-profile-data', async function(req, res) {
    await client.connect();
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('users')

    // get data from db
    const profileData = await collection.findOne({ id: 1 })
    client.close()

    // IF loop for empty database case
    if (profileData === null) {
        res.send({}) // sends an empty object, so the app does not crash
    } else {
        res.send(profileData)
    }
})


// POST method endpoint + RequestHandler function to handle requests and responses (req, res).
app.post('/update-profile-data', async function(req, res) {
    const payload = req.body
    console.log("Saved data: ", payload)

    if (isEmptyObject(payload) || isInvalidEmail(payload)) {
        res.status(400).send("Object is empty or the email is not a valid format.") // you can send HTTP header status codes back
    } else {
        // Connect to db
        await client.connect()
        console.log("Connected successfully to server")
        const db = client.db(dbName)
        const collection = db.collection("users")
        
        // Save payload to db
        payload["id"] = 1
        await collection.updateOne( {id: 1}, {$set: payload}, {upsert: true} )
        client.close()

        res.send("Success")    
    }
    
})

export {
    app,
    server
}
