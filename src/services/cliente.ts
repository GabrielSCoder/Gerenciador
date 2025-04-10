import { getRequest, postRequest } from "./request";

export async function postCliente (data : any) {
    return await postRequest("/cliente", data)
}

export async function getCliente (id : number) {
    return await getRequest("/cliente/" + id)
}

export async function getClienteSelect () {
    return await getRequest("/cliente/select")
}

export async function getClientePagination (data : any) {
    return await postRequest("/cliente/pagination", data)
}

