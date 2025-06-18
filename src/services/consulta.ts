import { getRequest, postRequest, putRequest } from "./request";

export async function postConsulta (data : any) {
    return await postRequest("/consulta", data)
}

export async function updateConsulta (data : any) {
    return await putRequest("/consulta", data)
}

export async function getConsulta (id : number) {
    return await getRequest("/consulta/" + id)
}

export async function getConsultaPagination (data : any) {
    return await postRequest("/consulta/pagination", data)
}