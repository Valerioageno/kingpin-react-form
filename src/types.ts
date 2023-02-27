export type InputEffect = {
  sendData?: () => Result
}

export type Result = { name: string; value: Value }

export type Value = string | number | boolean | readonly string[]
