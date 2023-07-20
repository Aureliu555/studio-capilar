export default function servicesFunctions(data) {

    async function login(email, password) {
        const res = await data.login()
    }

    async function signUp(name, email, password) {
        await data.signUp(name, email, password)
    }

    async function getUserByEmail(email) {
        return await data.getUserByEmail(email)
    }

    async function getUserById(id) {
        return await data.getUserById(id)
    }

    async function getUser() {
        return await data.getUser()
    }
    
    async function getProfessionals() {
        return await data.getProfessionals()
    }

    async function getServices() {
        return await data.getServices()
    }

    async function getGallery() {
        return await data.getGallery()
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
