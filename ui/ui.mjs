import fs from 'node:fs/promises'

export default function uiFunctions(services) {
    
    async function homePage(req, resp) {
        const data = await fs.readFile("./professionals.json")
        const jsonData = JSON.parse(data)
        resp.render("home", {"professionals": jsonData.professionals})
    }
    
    return {
        homePage
    }

}
