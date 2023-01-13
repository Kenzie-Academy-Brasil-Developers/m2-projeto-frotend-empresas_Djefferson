import{toast} from "./toast.js"

export async function listaDeEmpreasas(){
    const empresa = await fetch("http://localhost:6278/companies",{
        method: "GET",
        headers:{
            "content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return empresa
}
export async function listaDeSetores(){
    const empresa = await fetch("http://localhost:6278/sectors",{
        method: "GET",
        headers:{
            "content-type":"application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return empresa
}

function getUser(){
    const user = JSON.parse(localStorage.getItem('@kenzieUser:user'))
}

export async function login(data){
    const loginData = await fetch("http://localhost:6278/auth/login",{
        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()
    

  if(loginDataJson.error) {
    toast("Senha ou email incorreto", '#CE4646')
  } else {
    toast('Login realizado com sucesso', '#4BA036')
    localStorage.setItem('@kenzie:userToken', JSON.stringify(loginDataJson))
    tipoDeUser()
    setTimeout(() => {
        window.location.replace('../pages/userDash.html') 
    }, 1000); 
}
}


export async function cadastrar(data){
    const cadastro = await fetch("http://localhost:6278/auth/register",{
        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    let cadastroJson = await cadastro.json()

    if(cadastroJson.error){
        toast('Cadastro invalido, verifique as informações' , '#CE4646')
    }else{
        toast('Usuário cadastrado com sucesso', '#4BA036')
    }
}
export async function tipoDeUser(){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const tipo = await fetch ("http://localhost:6278/auth/validate_user", {
        method: "GET",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    let tipoJson =  await tipo.json()
    
    if(true == await tipoJson.is_admin ){
        setTimeout(() => {
            window.location.replace("../pages/admiDash.html")
        }, 1000);
    }
}

export async function listaDosDepartamentos(){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    if(userToken == null){
        window.location.replace("/")
    }
    let {token} = userToken
    
    const departamentos = await fetch ("http://localhost:6278/departments",{
        method: "GET",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return departamentos
}

export async function listaDeUserSemDepartamento (){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const users = await fetch ("http://localhost:6278/admin/out_of_work",{
        method: "GET",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return users
}

export async function contratarUser (data){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const contratar = await fetch ("http://localhost:6278/departments/hire/",{
        method: "PATCH",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    
    const contratarJSON= await contratar.json()
    

    if(contratarJSON.error) {
        toast("Erro na Contratação", '#CE4646')
      }else{
        toast('Contratado com sucesso', '#4BA036')
    }
}

export async function listaDeUser (){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const users = await fetch ("http://localhost:6278/users",{
        method: "GET",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return users
 
}

export async function desligar (id){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const desligarUser = await fetch (`http://localhost:6278/departments/dismiss/${id}`,{
        method: "PATCH",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const desligarUserJSON= await desligarUser.json()

    if(desligarUserJSON.error) {
        toast("Erro na desligação", '#CE4646')
      }else{
        toast('Desligado com sucesso', '#4BA036')
    }
}
export async function editarDepartamento (id, data){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
  
    const editar = await fetch (`http://localhost:6278/departments/${id}`,{
        method: "PATCH",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const editarJSON = await editar.json()

    if(editarJSON.error) {
        toast("Erro na edição", '#CE4646')
      }else{
        toast('Editado com sucesso', '#4BA036')
    }
}

export async function criarDepartamento (data){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
  
    const criar = await fetch (`http://localhost:6278/departments`,{
        method: "POST",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const criarJSON = await criar.json()

    if(criarJSON.error) {
        toast("Erro na criação do departamento", '#CE4646')
      }else{
        toast('Criado com sucesso', '#4BA036')
    }
}

export async function deleteDepartamento (id){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const deleteDepart = await fetch (`http://localhost:6278/departments/${id}`,{
        method: "DELETE",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
   const deleteDepartJSon = deleteDepart.json()

    if(deleteDepartJSon.error) {
        toast("Delete não concluido", '#CE4646')
      }else{
        toast('Deletado com sucesso', '#4BA036')
    }
}

export async function atualizarUser (id, data){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const atulizar = await fetch (`http://localhost:6278/admin/update_user/${id}`,{
        method: "PATCH",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const atualizarJSON = await atulizar.json()

    if(atualizarJSON.error) {
        toast("Erro na atualização", '#CE4646')
      }else{
        toast('Atualizado com sucesso', '#4BA036')
    }
}

export async function deleteUser (id){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const deleteUser = await fetch (`http://localhost:6278/admin/delete_user/${id}`,{
        method: "DELETE",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
   const deleteUserJSon = deleteUser.json()

    if(deleteUserJSon.error) {
        toast("Delete não concluido", '#CE4646')
      }else{
        toast('Deletado com sucesso', '#4BA036')
    }
}
export async function infoUserLogado (){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    if(userToken == null){
        window.location.replace("/")
    }
    let {token} = userToken
    const logado = await fetch ("http://localhost:6278/users/profile",{
        method: "GET",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return logado
}

export async function infoDepartamentoLogado (){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken

    const logado = await fetch ("http://localhost:6278/users/departments",{
        method: "GET",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    

    return logado
}
export async function colegasDepartamentos (){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
    
    const colegas = await fetch ("http://localhost:6278/users/departments/coworkers",{
        method: "GET",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    return colegas
}

export async function atualizarUserLogado (data){
    let userToken =  JSON.parse(localStorage.getItem('@kenzie:userToken'))
    let {token} = userToken
  
    const atualizarUser= await fetch (`http://localhost:6278/users`,{
        method: "PATCH",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const atualizarUserJSON = await atualizarUser.json()

    if(atualizarUserJSON.error) {
        toast("Erro na atualização", '#CE4646')
      }else{
        toast('Atualizado com sucesso', '#4BA036')
    }
}