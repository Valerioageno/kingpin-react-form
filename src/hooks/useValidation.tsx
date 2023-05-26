import type { ValidationFn } from '../types'
import { useCallback } from 'react'

const useValidation = <T,>(
  validationFns: ValidationFn<T> | ValidationFn<T>[] | Record<string, ValidationFn<T>> | undefined,
): ((s?: T) => boolean | string[]) =>
  useCallback(
    (s) => {
      if (!validationFns) {
        return true
      }

      if (Array.isArray(validationFns)) {
        let validationRes = true
        validationFns.forEach((validFn) => {
          if (validFn(s) === false) validationRes = false
        })
        return validationRes
      }

      if (typeof validationFns === 'object' && validationFns !== null) {
        const res: string[] = []
        for (const [key, validFn] of Object.entries(validationFns)) {
          if (validFn(s) === false) res.push(key)
        }
        return res.length > 0 ? res : true
      }

      if ((validationFns as ValidationFn<T>)?.(s)) {
        return true
      }
      return false
    },
    [validationFns],
  )

export default useValidation
