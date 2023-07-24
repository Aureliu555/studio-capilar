import fs from 'node:fs/promises'
import bcrypt from 'bcrypt'
import errors from '../../errors/app-errros.mjs'

const users = []
const enrollmentRequests = []

export default function dataFunctions() {
    
    async function login(email, password) {
        const user = users.find(user => user.email === email)
        if (user === undefined) return Promise.reject(errors.NON_EXISTENT_EMAIL())

        if (await bcrypt.compare(password, user.password)) return user 
        else return Promise.reject(errors.INVALID_CREDENTIALS())
    }

    async function signUp(name, email, password) {
        const user = users.find(u => u.email === email)
        if (user) return Promise.reject(errors.EXISTENT_EMAIL())
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: hashedPassword,
            status: { owner: false, client: true, student: false }
        }
        users.push(newUser)
        return newUser
    }

    async function getEnrollmentRequests() {
        return enrollmentRequests
    }

    async function addEnrollRequest(name, email) {
        const user = {
            name: name,
            email: email
        }
        enrollmentRequests.push(user)
        console.log(enrollmentRequests)
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
        addEnrollRequest
    }
}
