import { getRequest, postRequest } from "./request";

export async function postUsuario (data : any) {
    return await postRequest("/usuario", data)
}

export async function getUsuario (id : number) {
    return await getRequest("/usuario/" + id)
}

export async function getUsuarioSelect (data : any) {
    return await postRequest("/usuario/select", data)
}

export async function getUsuarioPagination () {
    return await getRequest("/usuario/pagination")
}

