export default function apiFunctions(services) {

    async function getProfessionals(req, resp) {
        const professionals = await services.getProfessionals()
        resp.json(professionals)
    }

    async function getSchedules(req, resp) {
        const schedules = await services.getServices()
        resp.json(schedules)
    }

    async function getGallery(req, resp) {
        const gallery = await services.getGallery()
        resp.json(gallery)
    }
    
    return {
        getProfessionals,
        getSchedules,
        getGallery
    }
}
