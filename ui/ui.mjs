import fs from 'node:fs/promises'

export default function uiFunctions(services) {

    async function homePage(req, resp) {
        const professionals = await services.getProfessionals()
        resp.render("home", {"owner": professionals.owner, "workers": professionals.workers})
    }

    async function schedulesPage(req, resp) {
        const schedules = await services.getServices()
        resp.render("schedules", {"schedules": schedules})
    }
    
    return {
        homePage,
        schedulesPage
    }
}
