import{login} from "./request.js"


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
            tagCadastro.innerText = "Cadastro"
            tagCadastro.classList.add("botton_cadastrar")
            tagMenu.appendChild(tagCadastro)
            tagCadastro.addEventListener("click",()=>{
                window.location.replace("../pages/cadastro.html") 
            })

        }else{
            menu.src = "../assets/menu_FILL0_wght400_GRAD0_opsz48 1.png"
            menu.alt = "Menu de ferramentas"
            conteiner.innerHTML=""
        }
    })

}

function renderLogin (){
    let login = document.querySelector(".botton_login")

    login.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("/")
    
    })
}

function renderCadastro (){
    let cadastro = document.querySelector(".botton_cadastrar")
    let cadastro2 = document.querySelector("#cadastrar")

    cadastro.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("../pages/cadastro.html") 
    })
    cadastro2.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("../pages/cadastro.html") 
    })
}

function emailESenha(){
    let email = document.querySelector("#email")
    let senha = document.querySelector("#senha")
    let button = document.querySelector("#logar")


   
    button.addEventListener("click", async (event)=>{
        event.preventDefault()
        let data = {
            "email": `${email.value}`,
            "password": `${senha.value}`
        }
        await login(data)
    })

}

emailESenha()
abriMenu()
renderLogin()
renderCadastro()
