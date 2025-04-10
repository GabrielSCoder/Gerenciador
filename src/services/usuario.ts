import { getRequest, postRequest } from "./request";

export async function postUsuario (data : any) {
    return await postRequest("/usuario", data)
}

export async function getUsuario (id : number) {
    return await getRequest("/usuario/" + id)
}

export async function getUsuarioSelect () {
    return await getRequest("/usuario/select")
}

export async function getUsuarioPagination () {
    return await getRequest("/usuario/pagination")
}

