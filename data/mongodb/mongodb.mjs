import fs from 'node:fs/promises'
import {MongoClient, ServerApiVersion} from 'mongodb'
import bcrypt from 'bcrypt'
import errors from '../../errors/app-errros.mjs'

const MONGO_URI = process.env.MONGO_URI

const client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export default function dataFunctions() {
    
    async function login(email, password) {
        return await mongodbHander(async (db) => {
            const usersCollection = db.collection("users")

            const user = await usersCollection.findOne({'email': email})
            if (!user) return Promise.reject(errors.NON_EXISTENT_EMAIL())

            if (await bcrypt.compare(password, user.password)) return user 
            else return Promise.reject(errors.INVALID_CREDENTIALS())
        })
    }

    async function signUp(name, email, password) {
        return await mongodbHander(async (db) => {
            const usersCollection = db.collection("users")
            
            const existentEmail = await usersCollection.findOne({'email': email})
            if (existentEmail) return Promise.reject(errors.EXISTENT_EMAIL())

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {
                name: name,
                email: email,
                password: hashedPassword,
                status: { owner: false, client: true, student: false }
            }
            await usersCollection.insertOne(newUser)
            return newUser
        })
    }

    async function getEnrollmentRequests() {
        return await mongodbHander(async (db) => {
            const enrollmentRequests = db.collection("enrollment-requests")
            return enrollmentRequests.find().toArray()
        })
    }

    async function addEnrollRequest(name, email) {
        return await mongodbHander(async (db) => {
            const enrollmentRequests = db.collection("enrollment-requests")
            const existentEmail = await enrollmentRequests.findOne({'email': email})
            if (existentEmail) return Promise.reject(errors.EXISTENT_EMAIL())
            
            const user = {
                name: name,
                email: email
            }
            await enrollmentRequests.insertOne(user)
        })
    }

    async function acceptEnrollmentRequest(email) {
        return await mongodbHander(async (db) => {
            const enrollmentRequests = db.collection("enrollment-requests")
            await enrollmentRequests.deleteOne({'email': email})

            const users = db.collection("users")
            const newUserStatus = { owner: false, client: true, student: true }
            await users.updateOne({ email: email }, { $set: { status: newUserStatus } })
        })
    }

    async function mongodbHander(action) {
        try {
            await client.connect();
            const db = client.db("studio-capilar")
            return await action(db)
        } finally {
            await client.close();
        }
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
        login,
        signUp,
        getEnrollmentRequests,
        addEnrollRequest,
        acceptEnrollmentRequest
    }
}