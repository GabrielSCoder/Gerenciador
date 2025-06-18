import {
  parseISO,
  isValid,
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns'

/**
 * Converte uma string ou objeto Date para o formato "yyyy-MM-dd'T'HH:mm"
 * usado em inputs tipo datetime-local.
 * Se a string estiver só com a data (ex: "2024-06-16"), zera a hora.
 */
export const formatHorarioParaBackend = (input: string | Date | any) => {
  let dateObj;
  if (typeof input === 'string') {
    dateObj = parseISO(input); // converte ISO string para Date
  } else if (input instanceof Date) {
    dateObj = input;
  } else {
    return null;
  }

  if (!isValid(dateObj)) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    dateObj = setHours(setMinutes(setSeconds(setMilliseconds(dateObj, 0), 0), 0), 0);
  }

  return format(dateObj, "yyyy-MM-dd'T'HH:mm");
}

/**
 * Converte um timestamp (ou valor Date) para string no formato "dd/mm/yyyy"
 */
export const dateTimeStampToDate = (dt: any) => {
  const data = new Date(dt)
  const formatada = data.toLocaleDateString("pt-BR")
  return formatada
}

/**
 * Extrai a hora de um timestamp ou Date e retorna no formato "HH:mm"
 */
export const dateTimeStampToHour = (dt: any) => {
  const data = new Date(dt)
  const formatada = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  })
  return formatada
}

/**
 * Converte uma data em formato ISO (yyyy-mm-dd) para formato brasileiro (dd/mm/yyyy)
 */
export function convertSimpleDate(input: string): string {
  const [year, month, day] = input.split("-")
  return `${day}/${month}/${year}`
}

/**
 * Converte uma data no formato brasileiro (dd/mm/yyyy) para formato ISO (yyyy-mm-dd)
 */
export function formatToISO(date: string): string {
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}

/**
 * Converte um preço em string (ex: "R$ 1.234,56") ou número para número simples (ex: 1234.56)
 */
export function parsePreco(valor: string | number): number {
  if (typeof valor === "number") return valor
  if (!valor) return 0

  const limpo = valor
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim()

  const numero = parseFloat(limpo)
  return isNaN(numero) ? 0 : numero
}

/**
 * Formata um número para string de preço em reais (ex: "R$ 1.234,56")
 */
export function formatPreco(valor: number | string): string {
  if (!valor) return "R$ 0,00"

  const numero = typeof valor === "number" ? valor : parsePreco(valor)

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Converte uma data ISO (ex: "2024-06-16T12:30:00Z") para o formato de input datetime-local (ex: "2024-06-16T09:30")
 */
export function formatDatetimeForInput(dateString: string): string {
  const date = new Date(dateString)
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return offsetDate.toISOString().slice(0, 16)
}

/**
 * 🔹 NOVA FUNÇÃO:
 * Retorna a data atual no formato "dd/mm/yyyy"
 */
export function getTodayFormatted(): string {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${year}-${month}-${day}`
}


export const formatarPreco = (valor: number | string) =>
  Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export const formatToISO2 = (data: string) => {
  if (!data) return null;
  const [dia, mes, ano] = data.split("/");
  if (dia && mes && ano) {
    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  }
  return null;
};
