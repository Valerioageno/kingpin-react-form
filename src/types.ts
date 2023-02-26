export type InputEffect = {
  sendData?: () => Result
}

export type Value = string | number | readonly string[]

export type Result = { name: string; value: Value }
