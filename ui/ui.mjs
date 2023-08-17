import fetch from 'node-fetch'
import vimeo from 'vimeo'
import util from 'util'
import {convertToHttpError} from '../errors/http-errors.mjs'

let Vimeo = vimeo.Vimeo
const client = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "00c6c81958b9c46c279275730bf467b3");
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
            await uiHandler(req, resp, async () => { 
                const folders = await services.getFolders(req.user, body.data)
                resp.render("classes", {'user': req.user, 'folders': folders})
            })
        }) 
    }
    
    async function getVideo(req, resp) {
        client.request({
            method: 'GET',
            path: '/videos/' + req.query.videoId
        }, async (err, body) => {
            await uiHandler(req, resp, async () => {
                const video = await services.getVideo(req.user, body)
                resp.render("video", {'user': req.user, 'video': video})
            }) 
        })
    }

    async function course(req, resp) {
        resp.render("course", {'user': req.user, 'justClient': checkIfJustCliente(req)})
    }

    async function getEnrollmentRequests(req, resp) {
        await uiHandler(req, resp, async () => { 
            const enrollmentRequests = await services.getEnrollmentRequests()
            resp.render("enrollment-requests", {'user': req.user, 'enrollmentRequests': enrollmentRequests})
        })
    }

    async function acceptEnrollmentRequest(req, resp) {
        await uiHandler(req, resp, async () => { 
            await services.acceptEnrollmentRequest(req.params.userEmail)
            resp.redirect('/enrollmentRequests')
        })
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

    async function uiHandler(req, resp, block) {
        try {
            await block() 
        } catch (error) {
            console.log(error)
            const httpError = convertToHttpError(error)
            resp.render("error", {'user': req.user, 'error': httpError})
        }
    }

    function checkIfJustCliente(req) {
        if (req.user) {
            const status = req.user.status
            return !status.student && !status.owner  
        } else {
            return true
        }
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
