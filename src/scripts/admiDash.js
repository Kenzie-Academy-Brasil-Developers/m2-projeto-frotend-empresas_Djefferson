import{
    listaDosDepartamentos,
    listaDeEmpreasas,
    listaDeUserSemDepartamento,
    contratarUser,
    listaDeUser,
    desligar,
    editarDepartamento,
    criarDepartamento,
    deleteDepartamento,
    atualizarUser,
    deleteUser
} from "./request.js"
import { toast } from "./toast.js"

function logout(){
    let sair = document.querySelector(".botton_login")

    sair.addEventListener("click", (event)=>{
        event.preventDefault()

        localStorage.clear()
        window.location.replace("/")
    })
}

async function lerArr(arr){
    
    let departamentos = await arr
     
    departamentos.forEach(element => {
        let departamento = element
        
        renderDepartamentos(departamento)

    });
}

function renderDepartamentos (element){
    let lista = document.querySelector(".lista__departamento")
    let modal = document.querySelector(".modal__Visualizar")
    let modalEditar = document.querySelector(".modal__editar--descricao")
    let modalDelete = document.querySelector(".modal__delete--departamento")

    let tagLi = document.createElement("li")
    lista.appendChild(tagLi)

    let tagH3 = document.createElement("h3")
    tagH3.innerText = element.name
    tagLi.appendChild(tagH3)

    let tagDescription = document.createElement("p")
    tagDescription.innerText = element.description
    tagLi.appendChild(tagDescription)

    let tagCompany = document.createElement("p")
    tagCompany.innerText = element.companies.name
    tagLi.appendChild(tagCompany)

    let tagDiv = document.createElement("div")
    tagLi.appendChild(tagDiv)

    let tagVisualizar = document.createElement("img")
    tagVisualizar.classList.add("visualizar")
    tagVisualizar.src = "../assets/Visualizar.png"
    tagVisualizar.alt = "Icone de visualizar"
    tagVisualizar.dataset.id = element.uuid
    tagDiv.appendChild(tagVisualizar)
    
            
    tagVisualizar.addEventListener("click", ()=>{
        
        createModal(tagVisualizar.dataset.id)
        modal.innerHTML = ''
        
        modal.showModal()       

    })

    let tagEditar = document.createElement("img")
    tagEditar.src = "../assets/lapisBlack (1).png"
    tagEditar.alt = "Icone de  editar"
    tagEditar.dataset.id = element.uuid
    tagDiv.appendChild(tagEditar)

    tagEditar.addEventListener("click", ()=>{
        
        renderModalEditar(tagEditar.dataset.id)
        modalEditar.innerHTML = ''
        
        modalEditar.showModal()       

    })

    let tagDelete = document.createElement("img")
    tagDelete.src = "../assets/lixeira.png"
    tagDelete.alt = "Icone de Deletar"
    tagDelete.dataset.id = element.uuid
    tagDiv.appendChild(tagDelete)

    tagDelete.addEventListener("click", ()=>{
        
        modalDelete.innerHTML=""
        renderModalDeleteDepart(tagDelete.dataset.id)
        modalDelete.showModal()

    })

}

async function renderModalDeleteDepart(id){
    let modalDelete = document.querySelector(".modal__delete--departamento")

    let tagDiv = document.createElement("div")
    modalDelete.appendChild(tagDiv)

    let tagFechar = document.createElement("span")
    tagFechar.innerText = "X"
    tagDiv.appendChild(tagFechar)
    tagFechar.addEventListener("click", ()=>{
        modalDelete.close()
    })

    let tagH4 = document.createElement("h4")
    let departamentos = await listaDosDepartamentos()
    departamentos.forEach(element =>{
        if(element.uuid == id){
            tagH4.innerText = `Realmente deseja deletar o Departamento ${element.name} e demitir seus funcionários?`
        }
    })
    tagDiv.appendChild(tagH4)

    let tagButton = document.createElement("button")
    tagButton.innerText="Confirmar"
    tagDiv.appendChild(tagButton)
    tagButton.addEventListener("click", async ()=>{
        
        await deleteDepartamento(id)
        let lista = document.querySelector(".lista__departamento")
        
        lista.innerHTML=""
        lerArr(listaDosDepartamentos())
        
        let lista2 = document.querySelector(".lista__user")
        lista2.innerHTML=""
        renderUserCadastrados()
        modalDelete.close()
    })
}

async function lerAr2 (arr){

    let empresas = await arr
     
    empresas.forEach(element => {
        let empresa = element
        
        renderSelecaoDeEmpresa(empresa)
        return empresa
    });
 
}

export function renderSelecaoDeEmpresa(element){
    let select = document.querySelector(".select__empresa")
    
    let tagOption = document.createElement("option")
    tagOption.innerText = element.name
    tagOption.value = element.name
    select.appendChild(tagOption)

    select.addEventListener("change", ()=>{
        mudarEmpresas(select.value)
    })
}

async function mudarEmpresas(value){
    let departamentos = await listaDosDepartamentos()
    let lista = document.querySelector(".lista__departamento")
    lista.innerHTML=""
    
    departamentos.forEach(element => {
        let departamento = element
        
        if(value == departamento.companies.name ){
            renderDepartamentos(departamento)
        }else if(value == ""){
            renderDepartamentos(departamento)
        }
        return departamento
    });
}



async function createModal(id){
    let modal = document.querySelector(".modal__Visualizar")
    let departamentos = await listaDosDepartamentos()
    
    departamentos.forEach(element => {
        let departamento = element
        if(departamento.uuid == id){
          
            let tagModal = document.createElement("div")
            tagModal.classList.add("conteiner__modal")
            modal.appendChild(tagModal)
        
            let tagClose = document.createElement("span")
            tagClose.innerText="X"
            tagClose.classList.add("fechar__modal")
            tagModal.appendChild(tagClose)
            tagClose.addEventListener("click" , ()=>{
                modal.close()
                let select = document.querySelector(".select__empresa")
                mudarEmpresas(select.value)
            })
        
            let tagH4 = document.createElement("h4")
            tagH4.innerText = departamento.name
            tagModal.appendChild(tagH4)

            let tagBody = document.createElement("div")
            tagBody.classList.add("corpo")
            tagModal.appendChild(tagBody)

            let tagHeader = document.createElement("div")
            tagHeader.classList.add("cabecalho")
            tagBody.appendChild(tagHeader)

            let tagDescricao = document.createElement("h5")
            tagDescricao.innerText = departamento.description
            tagHeader.appendChild(tagDescricao)

            let tagNameEmpresa = document.createElement("p")
            tagNameEmpresa.innerText = departamento.companies.name
            tagHeader.appendChild(tagNameEmpresa)

            let tagConteinerContratar = document.createElement("div")
            tagConteinerContratar.classList.add("contratar")
            tagBody.appendChild(tagConteinerContratar)

            let tagSelect = document.createElement("select")
            tagSelect.value = ""
            tagSelect.classList.add("user__select")
            tagConteinerContratar.appendChild(tagSelect)

            let tagOption = document.createElement("option")
            tagOption.value = ""
            tagOption.innerText = "Selecionar usuário"
            tagSelect.appendChild(tagOption)

            let tagButton = document.createElement("button")
            tagButton.classList.add("button__contratar")
            tagButton.innerText = "Contratar"
            tagConteinerContratar.appendChild(tagButton)

            let tagUl = document.createElement("ul")
            tagUl.classList.add("lista__contratado")
            tagModal.appendChild(tagUl)

        }

    })
    selectUser()
    contratar(id)
}

async function selectUser(){
    let listaDeUser = document.querySelector(".user__select")
    
    let users = await listaDeUserSemDepartamento()
    users.forEach(element =>{
        
        let tagOption = document.createElement("option")
        tagOption.value = element.uuid
        tagOption.innerText = element.username
        listaDeUser.appendChild(tagOption)
    })
}

async function contratar(id){
    let select = document.querySelector(".user__select")
    let button = document.querySelector(".button__contratar")
    
    let departamentos = await listaDosDepartamentos()
    
    departamentos.forEach(element=>{
        
        if(element.uuid == id){
            
            button.addEventListener("click",async (event)=>{
                
                event.preventDefault()
                let data = {
                    "user_uuid": `${select.value}`,
                    "department_uuid": `${element.uuid}`
                }
              
                await contratarUser(data)

                await listaDeUserSemDepartamento()
                
                let listaDeUser = document.querySelector(".user__select")
                listaDeUser.innerHTML=""
                selectUser()
                let lista2 = document.querySelector(".lista__user")
                lista2.innerHTML=""
                renderUserCadastrados()
                
                let lista = document.querySelector(".lista__contratado")
                lista.innerHTML=""
                renderContratados(id) 
            })  
        }
    }) 
    renderContratados(id) 
}

async function renderContratados(id){
    let users = await listaDeUser()
    let lista = document.querySelector(".lista__contratado")

    lista.innerHTML=""
    users.forEach(element=>{
        
        if(element.department_uuid == id){
            

            let tagLi = document.createElement("li")
            lista.appendChild(tagLi)

            let tagH6 = document.createElement("h6")
            tagH6.innerText = element.username
            tagLi.appendChild(tagH6)

            let tagNivel = document.createElement("p")
            tagNivel.innerText = element.professional_level
            tagNivel.classList.add("nivel")
            tagLi.appendChild(tagNivel)

            let tagEmail = document.createElement("p")
            tagEmail.innerText = element.email
            tagEmail.classList.add("email")
            tagLi.appendChild(tagEmail)

            let tagButton = document.createElement("button")
            tagButton.innerText = "Desligar"
            tagButton.classList.add("desligar")
            tagButton.dataset.id = element.uuid
            tagLi.appendChild(tagButton)
            
            tagButton.addEventListener("click",async (event)=>{
            
                event.preventDefault()
                
                await desligar(tagButton.dataset.id)
                await listaDeUserSemDepartamento()
                
                let listaDeUser = document.querySelector(".user__select")
                listaDeUser.innerHTML=""
                selectUser()

                let lista2 = document.querySelector(".lista__user")
                lista2.innerHTML=""
                renderUserCadastrados()
                
                let lista = document.querySelector(".lista__contratado")
                lista.innerHTML=""
                renderContratados(id) 
            })

        }
    })
}

async function renderModalEditar(id){
    let modal = document.querySelector(".modal__editar--descricao")
    let departamentos = await listaDosDepartamentos()
    
    departamentos.forEach(element=>{
        if(id == element.uuid){

            let tagCorpo = document.createElement("div")
            tagCorpo.classList.add("corpo__modal")
            modal.appendChild(tagCorpo)

            let tagFechar = document.createElement("span")
            tagFechar.innerText = "X"
            tagCorpo.appendChild(tagFechar)
            tagFechar.addEventListener("click" , ()=>{
                modal.close()
            })

            let tagH4 = document.createElement("h4")
            tagH4.innerText = "Editar Departamento"
            tagCorpo.appendChild(tagH4)
            
            let tagForm = document.createElement("form")
            tagCorpo.appendChild(tagForm)

            let tagText = document.createElement("textarea")
            tagText.classList.add("description__text")
            tagText.innerText = element.description
            tagText.required = true
            tagForm.appendChild(tagText)
            
            let tagButtonSalvar = document.createElement("button")
            tagButtonSalvar.innerText = "Salvar alterações"
            tagButtonSalvar.type = "submit"
            tagForm.appendChild(tagButtonSalvar)
            tagButtonSalvar.addEventListener("click", (event)=>{
                event.preventDefault()
                DepartamentoDescricao(tagText.value, id)
                modal.close()
            })
        }
    })
}
 
async function DepartamentoDescricao(value, id){  
    let lista = document.querySelector(".lista__departamento")
    
    let data = {
        "description": `${value}`
    }
    await editarDepartamento(id, data)
    
    lista.innerHTML=""
    await lerArr(listaDosDepartamentos())
}

async function renderModalCriarDepart(){
    let modal = document.querySelector(".modal__criar--departamento")
    let button = document.querySelector(".button__criar--departamento")
    let fechar = document.querySelector(".fechar__criarDepartamento")
    let select = document.querySelector("#selecaoDeEmpresa")
    let empresas = await listaDeEmpreasas()
 
    button.addEventListener("click", (event)=>{
        event.preventDefault()
        modal.showModal()

        empresas.forEach(element=>{
            let tagOption = document.createElement("option")
            tagOption.innerText = element.name
            tagOption.value = element.uuid
            select.appendChild(tagOption)
            
        })
    })     
   

    let name = document.querySelector("#name")
    let descricao = document.querySelector("#descricao")
    let enviar = document.querySelector(".button__enviar--departamento")
    

    enviar.addEventListener("click", async (event)=>{
        event.preventDefault()
        let data = {
            "name": `${name.value}`,
            "description": `${descricao.value}`,
            "company_uuid": `${select.value}`
        }
        
        await criarDepartamento(data)
        
        let lista = document.querySelector(".lista__departamento")     
        lista.innerHTML=""
        await lerArr(listaDosDepartamentos())
        
        modal.close()
        let select2 = document.querySelector(".select__empresa")
        mudarEmpresas(select2.value)
    })

    fechar.addEventListener("click", ()=>{
        modal.close()
        let select2 = document.querySelector(".select__empresa")
        mudarEmpresas(select2.value)
    })
    
}

async function renderUserCadastrados(){
    let lista = document.querySelector(".lista__user")
    let users = await listaDeUser()
    let departamento = await listaDosDepartamentos()
    lista.innerHTML=""
    users.forEach(element =>{
        if(element.username !== "ADMIN"){
            
            let tagLi = document.createElement("li")
            lista.appendChild(tagLi)
    
            let tagH3 = document.createElement("h3")
            tagH3.innerText = element.username
            tagLi.appendChild(tagH3)
            
            let tagNivel = document.createElement("p")
            tagNivel.innerText = element.professional_level
            tagLi.appendChild(tagNivel)

            let tagCompany = document.createElement("p")
            if(element.department_uuid == null){
                tagCompany.innerText = "Desempregado"
            }else{
                departamento.forEach(element2 =>{
                    if(element.department_uuid == element2.uuid){
                        tagCompany.innerText = element2.companies.name
                    }
                })
            }
            tagLi.appendChild(tagCompany)
    
            let tagDiv = document.createElement("div")
            tagLi.appendChild(tagDiv)
    
            let tagEditar = document.createElement("img")
            tagEditar.src = "../assets/edit_FILL0_wght400_GRAD0_opsz48 1.png"
            tagEditar.alt = "Icone de  editar"
            tagEditar.dataset.id = element.uuid
            tagDiv.appendChild(tagEditar)
            tagEditar.addEventListener("click", async ()=>{
                renderModalEditarUser(tagEditar.dataset.id)
            })
    
            let tagDelete = document.createElement("img")
            tagDelete.src = "../assets/lixeira.png"
            tagDelete.alt = "Icone de Deletar"
            tagDelete.dataset.id = element.uuid
            tagDiv.appendChild(tagDelete)
            tagDelete.addEventListener("click", ()=>{
                let modal = document.querySelector(".modal__delete--user")
                modal.showModal()
                
                renderModalDeleteUser(tagDelete.dataset.id)
            })
        }

    })
}

function renderModalEditarUser(id){
    let modal = document.querySelector(".modal__editar--user")
    let fechar = document.querySelector(".fechar__editarUser")
    let modalidade = document.querySelector("#modalidade")
    let nivel = document.querySelector("#nivelProfissional")
    let button = document.querySelector(".button__editar--user")
    modal.showModal()
    
    fechar.addEventListener("click", ()=>{
        
        modal.close()
    })
    button.addEventListener("click", async (event)=>{
        event.preventDefault();
        
        let data = {
         "kind_of_work": `${modalidade.value}`,
         "professional_level": `${nivel.value}`
        } 
        if(modalidade.value == ""){
            toast("Erro na atualização", '#CE4646')
        }else{
    
            await atualizarUser(id, data)
            let lista2 = document.querySelector(".lista__user")
            lista2.innerHTML=""
            renderUserCadastrados()
            modal.close()
        }

    })
   
}

async function renderModalDeleteUser(id){
    let modal = document.querySelector(".modal__delete--user")
    modal.innerHTML=""

    let tagDiv = document.createElement("div")
    tagDiv.classList.add("corpo__modal--delete")
    modal.appendChild(tagDiv)

    let tagFechar = document.createElement("span")
    tagFechar.innerText = "X"
    tagDiv.appendChild(tagFechar)
    tagFechar.addEventListener("click", ()=>{
        modal.close()
    })

    let tagH4 = document.createElement("h4")
    let lista = await listaDeUser()
    lista.forEach(element=>{
        if(element.uuid == id){
            tagH4.innerText= `Realmente deseja remover o usuário ${element.username}?`
        }
    })
    tagDiv.appendChild(tagH4)

    let tagButton = document.createElement("button")
    tagButton.innerText = "Deletar"
    tagDiv.appendChild(tagButton)
    tagButton.addEventListener("click", async ()=>{
        await deleteUser(id)
        let lista2 = document.querySelector(".lista__user")
        lista2.innerHTML=""
        renderUserCadastrados()
        modal.close()
    })
}

logout()
lerArr(listaDosDepartamentos())
lerAr2(listaDeEmpreasas())
renderModalCriarDepart()
renderUserCadastrados()