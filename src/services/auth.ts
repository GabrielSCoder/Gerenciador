import { postRequest } from "./request";

export async function login (data : any) {
    return await postRequest("/auth/login", data)
}