export type Pixels = number

export function hex2Rgba(hex: string, alpha: number) {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  return `${r}, ${g}, ${b}, ${alpha}`
}
