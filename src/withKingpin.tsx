import useValidation from './hooks/useValidation'
import type { InputEffect, KingpinComponent, Result, WithKingpinProps } from './types'
import React, { ComponentType, forwardRef, useImperativeHandle, useState } from 'react'

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
 * @param initialState Default state. Used when "initialState" is not provided - Optional
 * @returns JSX.Element
 */
export default function withKingpin<T, State>(
  WrappedComponent: ComponentType<T>,
  initialState?: State,
): KingpinComponent<T, State> {
  const displayName = WrappedComponent?.displayName || WrappedComponent?.name || 'Component'

  const ComponentWithKingpin = forwardRef<InputEffect<State>, Omit<T, 'updateState'> & WithKingpinProps<State>>(
    (props, ref) => {
      const checkIsValid = useValidation(props.validation)

      const generateInitialVal = (): State | undefined =>
        typeof props?.initialValue === 'undefined' ? initialState : props?.initialValue

      const [state, setState] = useState<State | undefined>(generateInitialVal())
      const [isValid, setIsValid] = useState<boolean>(checkIsValid(state))

      useImperativeHandle(ref, () => ({
        sendData(): Result<State | undefined> {
          return { name: props?.name || 'Kingpin-element', value: state }
        },
        reset(): void {
          setState(generateInitialVal())
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
