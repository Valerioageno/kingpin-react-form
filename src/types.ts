import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

export type FormResult = {
  isFormValid: boolean
  payload: Record<string, Value>
}

export type InputEffect<T> = {
  sendData?: () => Result<T | undefined>
  reset?: () => void
  checkValidation?: () => boolean
  shouldShowError?: (e: Set<string>) => void
}
export type KingpinComponent<T, State> = ForwardRefExoticComponent<
  PropsWithoutRef<Omit<T, 'updateState'> & WithKingpinProps<State>> & RefAttributes<InputEffect<State>>
>

export type Result<T> = { name: string; value: T }

export type ValidationFn<State> = (s?: State) => boolean
export type Value = string | number | boolean | readonly string[] | undefined

export type WithKingpinProps<T> = {
  name: string
  initialValue?: T
  validation?: ValidationFn<T> | ValidationFn<T>[]
}

export type WithKingpinType<T> = {
  updateState?: (val: T) => void
}
