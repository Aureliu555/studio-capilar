import fs from 'node:fs/promises'

export default function dataFunctions() {

    async function getProfessionals() {
        const data = await fs.readFile("data/professionals.json")
        return JSON.parse(data)
    }
    
    return {
        getProfessionals
    }
}
