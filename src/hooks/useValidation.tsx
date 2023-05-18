import type { ValidationFn } from '../types'
import { useCallback } from 'react'

const useValidation = <T,>(validationFns: ValidationFn<T> | ValidationFn<T>[] | undefined): ((s: T) => boolean) =>
  useCallback(
    (s): boolean => {
      if (!validationFns) {
        return true
      }

      if (Array.isArray(validationFns)) {
        validationFns.forEach((validFn): boolean => {
          if (validFn(s) === false) {
            return false
          }
          return true
        })
        return true
      }

      if ((validationFns as ValidationFn<T>)?.(s)) {
        return true
      }
      return false
    },
    [validationFns],
  )

export default useValidation
