import fs from 'node:fs/promises'
import {MongoClient, ServerApiVersion} from 'mongodb'
import bcrypt from 'bcrypt'

const MONGO_URI = process.env.MONGO_URI

const client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const users = []

export default function dataFunctions() {

    async function getUserByEmail(email) {
        return users.find(user => user.email === email)
    }

    async function getUserById(id) {
        return users.find(user => user.id === id)
    }

    async function getUser() {
        run()
    }
    
    async function login(email, password) {
    }

    async function signUp(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        users.push({
            id: Date.now().toString(),
            name: name,
            email: email,
            password: hashedPassword
        })
    }
    

    async function getProfessionals() {
        return await getData("data/professionals.json")
    }

    async function getServices() {
        return await getData("data/services.json")
    }

    async function getGallery() {
        return await getData("data/gallery.json")
    }

    async function getData(path) {
        const data = await fs.readFile(path)
        return JSON.parse(data)
    }

    async function run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
    }
    
    return {
        getProfessionals,
        getServices,
        getGallery,
        getUser,
        login,
        signUp,
        getUserByEmail,
        getUserById
    }
}
