import { format, addSeconds } from 'date-fns'
import errors from '../errors/app-errros.mjs'

export default function servicesFunctions(data) {

    async function login(email, password) {
        const user = await data.login(email, password)
        // id not being used
        const serializableUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            status: user.status
        }
        return serializableUser
    }

    async function signUp(name, email, password) {
        return await data.signUp(name, email, password)
    }

    async function getFolders(user, videos) {
        if (user.status.client) return Promise.reject(errors.NOT_AUTHORIZED())
        const resData = videos.map(vid => {
            const newArr = vid.uri.split('/')
            return { 
                name: vid.name, 
                uri: vid.uri, 
                vidId: newArr[newArr.length - 1],
                duration: formatTime(vid.duration), 
                thumbnail_src: vid.pictures.base_link,
                folder: vid.parent_folder.name 
            }
        })

        const resultDict = getFolderVidsDictionary(resData)
        return resultDict 
    }

    async function getVideo(user, video) {
        if (user.status.client) return Promise.reject(errors.NOT_AUTHORIZED())
        return {'url': video.player_embed_url} 
    }

    function getFolderVidsDictionary(data) {
        const resultDict = data.reduce((acc, obj) => {
            const { name, uri, vidId, duration, thumbnail_src, folder } = obj;
            if (!acc[folder]) {
                acc[folder] = [];
            }
            acc[folder].push({name, uri, vidId, duration, thumbnail_src});
            return acc;
            }, {})
    
        // organize videos by publication date    
        return Object.keys(resultDict).map((prop) => { return { folder: prop, vids: resultDict[prop].reverse() } })
    }

    function formatTime(seconds) {
        const helperDate = addSeconds(new Date(0), seconds);
        if (seconds >= 3600) {
            return format(helperDate, 'H:mm:ss')
        } else {
            return format(helperDate, 'm:ss')
        }
    }

    async function getEnrollmentRequests(user) {
        if (!user.status.owner) return Promise.reject(errors.NOT_AUTHORIZED())
        else return await data.getEnrollmentRequests()
    }

    async function addEnrollRequest(name, email) {
        await data.addEnrollRequest(name, email)
    }

    async function acceptEnrollmentRequest(email) {
        await data.acceptEnrollmentRequest(email)
    }
    
    async function getProfessionals() {
        return await data.getProfessionals()
    }

    async function getServices() {
        return await data.getServices()
    }

    async function getGallery() {
        return await data.getGallery()
    }
    
    return {
        getProfessionals,
        getServices,
        getGallery,
        login,
        signUp,
        getEnrollmentRequests,
        addEnrollRequest,
        acceptEnrollmentRequest,
        getFolders,
        getVideo
    }
}
