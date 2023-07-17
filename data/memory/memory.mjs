import fs from 'node:fs/promises'

export default function dataFunctions() {

    async function getProfessionals() {
        return await getData("data/professionals.json")
    }

    async function getServices() {
        return await getData("data/services.json")
    }

    async function getGallery() {
        return await getData("data/gallery.json")
    }

    async function getData(path) {
        const data = await fs.readFile(path)
        return JSON.parse(data)
    }
    
    return {
        getProfessionals,
        getServices,
        getGallery
    }
}
