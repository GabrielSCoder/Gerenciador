export const dateTimeStampToDate = (dt: any) => {

    const data = new Date(dt)

    const formatada = data.toLocaleDateString("pt-BR")

    return formatada
}

export const dateTimeStampToHour = (dt: any) => {
    const data = new Date(dt)

    const formatada = data.toLocaleTimeString("pt-BR", {
        hour : "2-digit",
        minute : "2-digit"
    })

    return formatada
}