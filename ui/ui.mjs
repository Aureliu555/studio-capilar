import fs from 'node:fs/promises'

export default function uiFunctions(services) {

    async function homePage(req, resp) {
        const professionals = await services.getProfessionals()
        resp.render("home", {"owner": professionals.owner, "workers": professionals.workers})
    }

    async function getServices(req, resp) {
        const data = await fs.readFile("./data/professionals.json")
        const jsonData = JSON.parse(data)
        resp.render("home", {"professionals": jsonData.professionals})
    }

    async function schedulesPage(req, resp) {
        resp.render("schedules")
    }
    
    return {
        homePage,
        getServices,
        schedulesPage
    }
}
