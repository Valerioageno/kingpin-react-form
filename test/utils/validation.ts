export const shouldBe3 = (s: string): boolean => s === '3'

export const shouldBeAtLeast10Chars = (s: string): boolean => s.length > 10

export const shouldNotBeEmpty = (s: string | number | boolean): boolean => {
  if (typeof s === 'string') return s.length > 0
  return true
}

export const shouldNotBeNull = (s: null | Record<string, string>): boolean => s !== null
