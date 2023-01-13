import{cadastrar} from "./request.js"

function abriMenu (){
    let conteiner = document.querySelector(".conteiner__menu")
    let menu = document.querySelector("#menuDeFerramentas")

    menu.addEventListener("click", ()=>{

        if(menu.alt == "Menu de ferramentas"){
            
            menu.src = "../assets/close_FILL0_wght400_GRAD0_opsz48 1.png"
            menu.alt = "Fechar"
        
            let tagMenu = document.createElement("div")
            tagMenu.classList.add("menu")
            conteiner.appendChild(tagMenu)
        
            let tagLogin = document.createElement("a")
            tagLogin.innerText = "Home"
            tagLogin.classList.add("botton_login")
            tagMenu.appendChild(tagLogin)
            tagLogin.addEventListener("click", ()=>{
                window.location.replace("/")
            })
        
            let tagCadastro = document.createElement("a")
            tagCadastro.innerText = "Login"
            tagCadastro.classList.add("botton_cadastrar")
            tagMenu.appendChild(tagCadastro)
            tagCadastro.addEventListener("click", ()=>{
                window.location.replace("../pages/login.html")
            })
        }else{
            menu.src = "../assets/menu_FILL0_wght400_GRAD0_opsz48 1.png"
            menu.alt = "Menu de ferramentas"
            conteiner.innerHTML=""
        }
    })

}

function renderLogin (){
    let login = document.querySelector(".botton_cadastrar")

    login.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("../pages/login.html")
        
    })
}

function renderHome (){
    let login = document.querySelector(".botton_login")
    let retorna = document.querySelector("#retorna")

    login.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("/")
    })
    
    retorna.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("/")
    })
}

function infoCadastro(){
    let name = document.querySelector("#name")
    let email = document.querySelector("#email")
    let senha = document.querySelector("#senha")
    let nivel = document.querySelector("#nivel")
    let button = document.querySelector("#cadastra__user")

    button.addEventListener("click",async (event)=>{
        event.preventDefault()
        let data={
            "username": `${name.value}`,
            "password": `${senha.value}`,
            "email": `${email.value}`,
            "professional_level": `${nivel.value}`
        }
        await cadastrar(data)
    })
    
}
abriMenu()
infoCadastro()
renderHome()
renderLogin()