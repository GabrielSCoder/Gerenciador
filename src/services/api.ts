// export const API_URL = "https://localhost:7215/api";
export const API_URL = "https://localhost:7020/api";

export const ARQUIVO_API_URL = API_URL + "/arquivo/download/"
export const getApiArquivoUrl = (id?: number) => id ? ARQUIVO_API_URL + id : ""