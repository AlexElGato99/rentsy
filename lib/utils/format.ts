export function formatPrice(value: number, currency: string = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value)
  } catch {
    return `${currency} ${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value)}`
  }
}
