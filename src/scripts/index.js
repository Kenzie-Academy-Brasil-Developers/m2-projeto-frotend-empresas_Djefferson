import{listaDeEmpreasas,listaDeSetores} from"./request.js";

function abriMenu (){
    let conteiner = document.querySelector(".conteiner__menu")
    let menu = document.querySelector("#menuDeFerramentas")

    menu.addEventListener("click", ()=>{

        if(menu.alt == "Menu de ferramentas"){
            
            menu.src = "./src/assets/close_FILL0_wght400_GRAD0_opsz48 1.png"
            menu.alt = "Fechar"
        
            let tagMenu = document.createElement("div")
            tagMenu.classList.add("menu")
            conteiner.appendChild(tagMenu)
        
            let tagLogin = document.createElement("a")
            tagLogin.innerText = "Login"
            tagLogin.classList.add("botton_login")
            tagMenu.appendChild(tagLogin)
            tagLogin.addEventListener("click", ()=>{
                window.location.replace("./src/pages/login.html")
            })

            let tagCadastro = document.createElement("a")
            tagCadastro.innerText = "Cadastro"
            tagCadastro.classList.add("botton_cadastrar")
            tagMenu.appendChild(tagCadastro)
            tagCadastro.addEventListener("click", ()=>{
                window.location.replace("./src/pages/cadastro.html")
            })
        }else{
            menu.src = "./src/assets/menu_FILL0_wght400_GRAD0_opsz48 1.png"
            menu.alt = "Menu de ferramentas"
            conteiner.innerHTML=""
        }
    })

}

function renderLogin (){
    let login = document.querySelector(".botton_login")

    login.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("./src/pages/login.html")
        
    })
}

function renderCadastro (){
    let cadastro = document.querySelector(".botton_cadastrar")

    cadastro.addEventListener("click", (event)=>{
        event.preventDefault();
        window.location.replace("./src/pages/cadastro.html")
        
    })
}
 
 async function lerArr (arr){

    let empresas = await arr
     
    empresas.forEach(element => {
        let empresa = element
        
        renderSetores(empresa);
        return empresa
    });
 
}
async function lerArr2 (arr){

    let empresas = await arr
     
    empresas.forEach(element => {
        let empresa = element
        renderEmpresas(empresa);
        return empresa
    });
 
}

function renderEmpresas(empresas){
    let lista = document.querySelector(".lista_empresas")
   
    let tagLi = document.createElement("li")
    lista.appendChild(tagLi)

    let tagH3 = document.createElement("h3")
    tagH3.innerText = empresas.name
    tagLi.appendChild(tagH3)

    let tagP = document.createElement("p")
    tagP.innerText = empresas.opening_hours
    tagLi.appendChild(tagP)

    let tagSetor = document.createElement("div")
    tagSetor.innerText = empresas.sectors.description
    tagLi.appendChild(tagSetor)

}
 function renderSetores(empresas){
    let setores = document.querySelector(".header__list")
    let select = document.querySelector(".header__list")

    let  tagOption = document.createElement("option")
    tagOption.innerText = empresas.description
    tagOption.value = empresas.description
    setores.appendChild(tagOption)
    
    select.addEventListener("change", ()=>{
        mudarSetores(select.value)
    })
  
}
async function mudarSetores(value){
    let empresas = await listaDeEmpreasas()
    let lista = document.querySelector(".lista_empresas")
    lista.innerHTML=""
   
    empresas.forEach(element => {
        let empresa = element
        if(value ==  element.sectors.description){
            renderEmpresas(empresa)
        }else if(value == ""){
            renderEmpresas(empresa)
        }
        return empresa
    });
}


abriMenu()
renderLogin()
renderCadastro()
lerArr(listaDeSetores())
lerArr2(listaDeEmpreasas())
