import { parseISO, isValid, format, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns'

export const formatHorarioParaBackend = (input : string | Date | any) => {
  // Se for string, tenta converter para Date
  let dateObj;
  if (typeof input === 'string') {
    dateObj = parseISO(input); // converte ISO string para Date
  } else if (input instanceof Date) {
    dateObj = input;
  } else {
    return null; // ou lance erro
  }

  if (!isValid(dateObj)) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    dateObj = setHours(setMinutes(setSeconds(setMilliseconds(dateObj, 0), 0), 0), 0);
  }

  return format(dateObj, "yyyy-MM-dd'T'HH:mm");
}

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

export function parsePreco(valor: string | number): number {
  if (typeof valor === "number") return valor;

  if (!valor) return 0;

  const limpo = valor
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const numero = parseFloat(limpo);

  return isNaN(numero) ? 0 : numero;
}

export function formatPreco(valor: number | string): string {
  if (!valor) return "R$ 0,00";

  const numero = typeof valor === "number" ? valor : parsePreco(valor);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDatetimeForInput(dateString: string): string {
    const date = new Date(dateString);

    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return offsetDate.toISOString().slice(0, 16);
}