export default function servicesFunctions(data) {
    
    async function getProfessionals() {
        return await data.getProfessionals()
    }
    
    return {
        getProfessionals
    }
}
