import { useIsomorphicEffect } from './helpers'
import { InputEffect, Result } from './types'
import React, {
  ComponentType,
  ForwardRefExoticComponent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

export type KingpinComponent<T, State> = ForwardRefExoticComponent<
  React.PropsWithoutRef<Omit<T, 'updateState'> & WithKingpinProps<State>> & React.RefAttributes<InputEffect<State>>
>
export type WithKingpinType<T> = {
  updateState?: (val: T) => void
}

type ValidationFn<State> = (s: State) => boolean

type WithKingpinProps<T> = {
  name: string
  initialValue: T
  validation?: ValidationFn<T> | ValidationFn<T>[]
}

/**
 * @description Trasnform the passed WrappedComponent into an input usable by the Kingpin form component.
 * The new Component will have two new mandatory props:
 * - name: string
 * - initialValue: T
 *
 * In order to make it usable with Kingpin it passes as props the updateState method which has
 * to be used as state setter.
 * Check the documentation for more details.
 * @param WrappedComponent ComponentType T
 * @returns JSX.Element
 */
export default function withKingpin<T, State>(WrappedComponent: ComponentType<T>): KingpinComponent<T, State> {
  const displayName = WrappedComponent?.displayName || WrappedComponent?.name || 'Component'

  const ComponentWithKingpin = forwardRef<InputEffect<State>, Omit<T, 'updateState'> & WithKingpinProps<State>>(
    (props, ref) => {
      const [state, setState] = useState<State>(props.initialValue)
      const [isValid, setIsValid] = useState<boolean>(true)

      const checkIsValid = useCallback(
        (s: State): boolean => {
          if (!props.validation) {
            return true
          }

          if (Array.isArray(props.validation)) {
            props.validation.forEach((validFn): boolean => {
              if (validFn(s) === false) {
                return false
              }
              return true
            })
            return true
          }

          if ((props.validation as ValidationFn<State>)?.(s)) {
            return true
          }
          return false
        },
        [props.validation],
      )

      // Check on the first render if the initial value is valid
      useIsomorphicEffect(() => {
        setIsValid(checkIsValid(props.initialValue))
      }, [checkIsValid, props.initialValue])

      useImperativeHandle(ref, () => ({
        sendData(): Result<State> {
          return { name: props?.name || 'Kingpin-element', value: state }
        },
        reset(): void {
          setState(props.initialValue)
        },
        checkValidation(): boolean {
          return isValid
        },
      }))

      return (
        <WrappedComponent
          {...(props as unknown as T)}
          value={state}
          updateState={(val: State): void => {
            setIsValid(checkIsValid(val))
            setState(val)
          }}
          isValid={isValid}
        />
      )
    },
  )

  ComponentWithKingpin.displayName = `withKingpin(${displayName})`

  return ComponentWithKingpin
}
