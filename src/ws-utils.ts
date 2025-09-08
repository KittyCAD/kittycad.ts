export function isArrayBufferViewLike(
  v: unknown
): v is { buffer: ArrayBuffer; byteOffset: number; byteLength: number } {
  return (
    !!v &&
    typeof v === 'object' &&
    'buffer' in (v as Record<string, unknown>) &&
    (v as { buffer: unknown }).buffer instanceof ArrayBuffer &&
    typeof (v as { byteOffset?: unknown }).byteOffset === 'number' &&
    typeof (v as { byteLength?: unknown }).byteLength === 'number'
  )
}
