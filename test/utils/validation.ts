export const shouldBeAtLeast10Chars = (s: string): boolean => s.length > 10

export const shouldNotBeEmpty = (s: string | number | boolean): boolean => {
  if (typeof s === 'string') return s.length > 0
  return true
}
