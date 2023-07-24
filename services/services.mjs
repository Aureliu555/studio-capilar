export default function servicesFunctions(data) {

    async function login(email, password) {
        const user = await data.login(email, password)
        // id not being used
        const serializableUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            status: user.status
        }
        return serializableUser
    }

    async function signUp(name, email, password) {
        return await data.signUp(name, email, password)
    }

    async function getEnrollmentRequests() {
        return data.getEnrollmentRequests()
    }

    async function addEnrollRequest(name, email) {
        await data.addEnrollRequest(name, email)
    }

    async function acceptEnrollmentRequest(email) {
        await data.acceptEnrollmentRequest(email)
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
        login,
        signUp,
        getEnrollmentRequests,
        addEnrollRequest,
        acceptEnrollmentRequest
    }
}
