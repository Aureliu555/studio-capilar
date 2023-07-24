import fetch from 'node-fetch';

export default function uiFunctions(services) {
    const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5555/"

    async function homePage(req, resp) {
        const professionals = await fetchData("api/professionals")
        const galleryJson = await fetchData("api/gallery")
        resp.render("home", {'homePage': true ,"owner": professionals.owner, "workers": professionals.workers, "gallery_imgs": galleryJson.gallery, 'user': req.user})
    }
    
    async function schedulesPage(req, resp) {
        const schedules = await fetchData("api/schedules")
        resp.render("schedules", {"schedules": schedules, 'user': req.user})
    }

    async function classes(req, resp) {
        // render an unauthorized error view in case the !user.status.student && !user.status.owner
        resp.render("classes", {'user': req.user})
    }

    async function course(req, resp) {
        resp.render("course", {'user': req.user, 'justClient': checkIfJustCliente(req)})
    }

    async function getEnrollmentRequests(req, resp) {
        const enrollmentRequests = await services.getEnrollmentRequests()
        resp.render("enrollment-requests", {'user': req.user, 'enrollmentRequests': enrollmentRequests})
    }

    async function acceptEnrollmentRequest(req, resp) {
        await services.acceptEnrollmentRequest(req.params.userEmail)
        resp.redirect('/enrollmentRequests')
    }

    async function enroll(req, resp) {
        // try catch needs to be implemented
        try {
            await services.addEnrollRequest(req.user.name, req.user.email)
            resp.redirect('/course')
            //resp.render("course", {'user': req.user, message: 'Pedido de inscrição realizado com sucesso', 'justClient': checkIfJustCliente(req)})   
        } catch(error) {
            resp.redirect('/course')
            //resp.render("course", {'user': req.user, error: error, 'justClient': checkIfJustCliente(req)})
        }
    }

    async function fetchData(url) {
        const res = await fetch(API_BASE_URL + url, {method: "GET", headers: {"Accept" : "application/json"}})
        return await res.json()
    }

    function checkIfJustCliente(req) {
        const status = req.user.status
        return !status.student && !status.owner 
    }
    
    return {
        homePage,
        schedulesPage,
        classes,
        course,
        enroll,
        getEnrollmentRequests,
        acceptEnrollmentRequest
    }
}
