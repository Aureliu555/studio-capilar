export default function uiFunctions(services) {
    
    function homePage(req, resp) {
        resp.render("home")
    }
    
    return {
        homePage
    }

}
