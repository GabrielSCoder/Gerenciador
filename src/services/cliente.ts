import { deleteRequest, getRequest, postRequest, putRequest  } from "./request";

export async function postCliente (data : any) {
    return await postRequest("/cliente", data)
}

export async function updateCliente (data : any) {
    return await putRequest("/cliente", data)
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

export async function deleteCliente (id : number) {
    return await deleteRequest("/cliente/" + id)
}



