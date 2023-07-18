import fs from 'node:fs/promises'
import {MongoClient, ServerApiVersion} from 'mongodb'

const MONGO_URI = process.env.MONGO_URI

const client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

export default function dataFunctions() {

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

    async function getUser() {
        run()
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
    
    return {
        getProfessionals,
        getServices,
        getGallery,
        getUser
    }
}
