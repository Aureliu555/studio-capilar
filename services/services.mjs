export default function servicesFunctions(data) {

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
        getUser
    }
}
