export type FormResult = {
  isFormValid: boolean
  payload: Record<string, Value>
}
export type InputEffect<T> = {
  sendData?: () => Result<T>
  reset?: () => void
  checkValidation?: () => boolean
}

export type Result<T> = { name: string; value: T }

export type ValidationFn<State> = (s: State) => boolean
export type Value = string | number | boolean | readonly string[]
