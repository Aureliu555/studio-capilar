window.addEventListener('load', loadHandler)
const API_BASE_URL =  "http://localhost:5555/"
function loadHandler() {
    
    const menu_btn = document.querySelector('.hamburger')
    const mobile_menu = document.querySelector('.mobile-nav')
    //const logOutLink = document.getElementById("logoutRequest")
    
    menu_btn.addEventListener('click', () => {
        menu_btn.classList.toggle('is-active')
        mobile_menu.classList.toggle('is-active')
    })
    
    /*logOutLink.addEventListener('click', (ev) => {
        ev.preventDefault()
        fetch(API_BASE_URL + 'logout', {method: "POST"}).then(res => console.log())
        console.log("Before logout")
        await fetch(API_BASE_URL + '/logout', {method: "POST"})
        console.log("After logout")
        await fetch(API_BASE_URL)
        console.log("After fetch home")
    })*/
}
/*window.onload = function() {
    
    

    
    
}*/

