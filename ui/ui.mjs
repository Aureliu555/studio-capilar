import fetch from 'node-fetch';

export default function uiFunctions() {
    const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5555/"

    async function homePage(req, resp) {
        const professionals = await fetchData("api/professionals")
        const galleryJson = await fetchData("api/gallery")
        resp.render("home", {"owner": professionals.owner, "workers": professionals.workers, "gallery_imgs": galleryJson.gallery, 'user': req.user})
    }
    
    async function schedulesPage(req, resp) {
        const schedules = await fetchData("api/schedules")
        resp.render("schedules", {"schedules": schedules, 'user': req.user})
    }

    async function classes(req, resp) {
        resp.render("classes", {'user': req.user})
    }

    async function fetchData(url) {
        const res = await fetch(API_BASE_URL + url, {method: "GET", headers: {"Accept" : "application/json"}})
        return await res.json()
    }
    
    return {
        homePage,
        schedulesPage,
        classes
    }
}
