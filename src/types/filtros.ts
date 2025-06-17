export type consultaFilter = {
    pesquisa ?: string
    dataCadastroInicio ?: string
    dataCadastroFim ?: string
    horarioInicio ?: string
    horarioFim ?: string
    criador ?: number
    ordem ?: "ASC" | "DESC"
    modificador ?: "nome" | "data_criacao" | "data_modificacao"
    tamanhoPagina : number
    numeroPagina : number
}