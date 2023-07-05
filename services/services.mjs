export default function servicesFunctions(data) {
    
    async function getProfessionals() {
        return await data.getProfessionals()
    }

    async function getServices() {
        return await data.getServices()
    }
    
    return {
        getProfessionals,
        getServices
    }
}
