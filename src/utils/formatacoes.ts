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

export function convertSimpleDate(input: string): string {
    const [year, month, day] = input.split("-");
    return `${day}/${month}/${year}`;
}

export function formatToISO(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
}

export function parsePreco(preco: string): number {
  const cleaned = preco.replace(/[R$\s.]/g, "").replace(",", ".");
  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
}