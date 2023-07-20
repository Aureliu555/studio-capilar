export default function apiFunctions(services) {

    async function login(req, resp) {
        const res = await services.login(req.body.email, req.body.password)
    }

    async function signUp(req, resp) {
        try {
            const res = await services.signUp(req.body.name, req.body.email, req.body.password)
            resp.redirect('/login')
        } catch {
            resp.redirect('/signUp')
        }
    }

    async function logOut(req, resp) {
        req.logOut()
        resp.redirect('/login')
    }
    
    async function getUser(req, resp) {
        await services.getUser()
        resp.json({res: 'OK'})
    }

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
        getGallery,
        getUser,
        login,
        signUp,
        logOut
    }
}
