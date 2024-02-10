export function formatCurrency(value: number) {
  return value.toLocaleString("PT-BR", {
    style: "currency",
    currency: "BRL"
  })
}