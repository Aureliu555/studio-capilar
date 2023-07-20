import fetch from 'node-fetch';

export default function uiFunctions() {
    const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5555/"

    async function homePage(req, resp) {
        const professionals = await fetchData("api/professionals")
        const galleryJson = await fetchData("api/gallery")
        console.log(req.user.name)
        resp.render("home", {"owner": professionals.owner, "workers": professionals.workers, "gallery_imgs": galleryJson.gallery})
    }

    async function schedulesPage(req, resp) {
        const schedules = await fetchData("api/schedules")
        resp.render("schedules", {"schedules": schedules})
    }

    async function login(req, resp) {
        resp.render("login")
    }

    async function signUp(req, resp) {
        resp.render("signUp")
    }

    async function fetchData(url) {
        const res = await fetch(API_BASE_URL + url, {method: "GET", headers: {"Accept" : "application/json"}})
        return await res.json()
    }
    
    return {
        homePage,
        schedulesPage,
        login,
        signUp
    }
}
