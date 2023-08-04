import fetch from 'node-fetch';
import vimeo from 'vimeo'
import util from 'util'

let Vimeo = vimeo.Vimeo
const client = new Vimeo("367573aa7b8620ebaad26c2eb7a38f3f017dc448", "coHHb77Gj6v34/ZoZ/VvBxQLidGQuUJOYCy4gC0Udea3bC4trJzrxUo3Fr4PXnLuezK9nByRaYd0vimpGpCHjwzMmMkgoRrc+r1mWFMQua34NHFGxn+jgQa3IO6Q224D", "e175d19b531ebef181b4426d55bc6b22");
const clientRequestAsync = util.promisify(client.request.bind(client));

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
        if (req.query.videoId) await getVideo(req, resp)
        else await getFolders(req, resp) 
    }

    async function getFolders(req, resp) {
        client.request({
            method: 'GET',
            path: '/me/videos'
        }, async (err, body) => {
            // handle error
            const folders = await services.getFolders(body.data)
            resp.render("classes", {'user': req.user, 'folders': folders})
        }) 
    }
    
    async function getVideo(req, resp) {
        client.request({
            method: 'GET',
            path: '/videos/' + req.query.videoId
        }, async (err, body) => {
            // handle error
            resp.render("video", {'user': req.user, 'video_url': body.player_embed_url})
        })
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
