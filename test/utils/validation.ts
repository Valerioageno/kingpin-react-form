export const shouldBe3 = (s?: string): boolean => s === '3'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shouldBeAnEmail = (s?: any): boolean => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(s || '')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shouldBeAtLeast10Chars = (s?: any): boolean => (s?.length || 0) > 10
export const shouldBeFirst = (s?: string): boolean => s === 'radio1'
export const shouldNotBeEmpty = (s?: string | number | boolean): boolean => {
  if (typeof s === 'string') return s.length > 0
  return true
}

export const shouldNotBeNull = (s?: null | Record<string, string>): boolean => s !== null
