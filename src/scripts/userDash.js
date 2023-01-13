import{infoUserLogado,infoDepartamentoLogado,colegasDepartamentos, atualizarUserLogado} from"./request.js"
function logout(){
    let sair = document.querySelector(".botton_login")

    sair.addEventListener("click", (event)=>{
        event.preventDefault()

        localStorage.clear()
        window.location.replace("/")
    })
}

async function renderPerfil(){
    let perfil = document.querySelector(".conteiner__perfil")
    let perfilLogado = await infoUserLogado()
        perfil.innerHTML="" 
        
        let tagH2 = document.createElement("h2")
        tagH2.innerText = perfilLogado.username
        perfil.appendChild(tagH2)
        
        let tagInfoPerfil = document.createElement("div")
        tagInfoPerfil.classList.add("conteiner__perfil--info")
        perfil.appendChild(tagInfoPerfil)

        let tagEmail = document.createElement("span")
        tagEmail.innerText = `Email: ${perfilLogado.email}`
        tagInfoPerfil.appendChild(tagEmail)
        
        let tagNivel = document.createElement("span")
        tagNivel.innerText = perfilLogado.professional_level
        tagInfoPerfil.appendChild(tagNivel)
        
        let tagModalidade = document.createElement("span")
        tagModalidade.innerText = perfilLogado.kind_of_work
        tagInfoPerfil.appendChild(tagModalidade)
        
        let tagEditar = document.createElement("img")
        tagEditar.src = "../assets/edit_FILL0_wght400_GRAD0_opsz48 1.png"
        tagEditar.alt = "Icone de editar perfil"
        tagInfoPerfil.appendChild(tagEditar)
        tagEditar.addEventListener("click", ()=>{
            
            let modal = document.querySelector(".modal__atulizar--user")
            
            modal.showModal()
            atulizar()
        })
  
    } 
    
    async function companyNameEDepartmentName(){
        let title = document.querySelector(".title__list")
    let departamento = await infoDepartamentoLogado()
    let userLogado = await infoUserLogado()
    
    departamento.departments.forEach(element => {
    
        if(element.uuid == userLogado.department_uuid){
                
            let tagH3 = document.createElement("h3")
            tagH3.innerText = `${departamento.name} - ${element.name} `
            title.appendChild(tagH3)
        }
        
    })
    
}

async function renderColegas(){
    let lista = document.querySelector(".lista__department")
    let colegas = await colegasDepartamentos()
    let perfilLogado = await infoUserLogado()
    
    if(colegas == ""){
        let tagH5 = document.createElement("h5")
        tagH5.innerText = "Você ainda não foi contratado"
        lista.appendChild(tagH5)
        
    }else{
        
        colegas.forEach(element=>{
    
            element.users.forEach(element2 =>{
                
                if(perfilLogado.uuid !== element2.uuid){
                    
                    let tagLi = document.createElement("li")
                    lista.appendChild(tagLi)
                    
                    let tagH4 = document.createElement("h4")
                    tagH4.innerText = element2.username
                    tagLi.appendChild(tagH4)
                    
                    let tagP = document.createElement("p")
                    tagP.innerText = element2.professional_level
                    tagLi.appendChild(tagP)
                }
                
            })
            
        })
    }
}

function atulizar(){
    let name = document.querySelector("#name")
    let email = document.querySelector("#email")
    let senha = document.querySelector("#senha")
    let button = document.querySelector(".button__atulizar")
    let fechar = document.querySelector(".fechar__modal")
    let modal = document.querySelector(".modal__atulizar--user")

    fechar.addEventListener("click",()=>{
        modal.close()
    })
    
    button.addEventListener("click", async (event)=>{
        event.preventDefault()

        let data = {
            "username": `${name.value}`,
            "password": `${senha.value}`,
            "email": `${email.value}`
        }
        await atualizarUserLogado(data)
        renderPerfil()
        modal.close()
    })
}

renderColegas()
renderPerfil()
companyNameEDepartmentName()
logout()

